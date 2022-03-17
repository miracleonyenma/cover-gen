const chromium = require("chrome-aws-lambda"),
	puppeteer = require("puppeteer-core"),
	fs = require("fs"),
	cloudinary = require("cloudinary").v2;
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadScreenshot = (e, t) =>
	new Promise((a, o) => {
		(e = e || { folder: "screenshots", public_id: `screenshot-${new Date().getTime()}` }),
			cloudinary.uploader
				.upload_stream(e, (e, t) => {
					e ? o(err) : a(t);
				})
				.end(t);
	});
exports.handler = async function (e, t) {
	const { targetURL: a, document: o } = JSON.parse(e.body),
		r = await puppeteer.launch({ args: chromium.args, executablePath: await chromium.executablePath, headless: !0 });
	console.log(r.isConnected(), await r.version());
	const i = await r.newPage();
	console.log(await i.title()),
		await i.setViewport({ width: 1200, height: 628, deviceScaleFactor: 1 }),
		await i.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "dark" }]);
	try {
		await i.goto(a, { timeout: 0 });
		await i.waitForSelector("#form-cont", { hidden: !0 });
		const e = await i.waitForSelector("#content h1");
		await e.click();
		const t = await i.waitForSelector("#title"),
			c = await i.waitForSelector("#description"),
			s = await i.waitForSelector("#updatedAt");
		await t.type(`${o.title}`), await c.type(`${o.description}`), await s.type(`${o.updatedAt}`), await e.click();
		const n = await i.screenshot({ encoding: "binary" }),
			l = { folder: `miracleio.me/covers/${o.slug}`, public_id: "cover" };
		return (
			(o.coverData = await uploadScreenshot(l, n)),
			console.log(o.coverData),
			await r.close(),
			{ statusCode: 200, body: JSON.stringify({ targetURL: a, coverData: o.coverData }) }
		);
	} catch (e) {
		return console.log(e), await r.close(), { statusCode: 400, body: JSON.stringify({ err: e }) };
	}
};
