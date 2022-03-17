const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

cloudinary.config(require("../cloudinary.config"));

const uploadScreenshot = (options, screenshot) => {
	return new Promise((resolve, reject) => {
		options = options || {
			folder: "screenshots",
			public_id: `screenshot-${new Date().getTime()}`,
		};

		cloudinary.uploader
			.upload_stream(options, (error, result) => {
				if (error) reject(err);
				else resolve(result);
			})
			.end(screenshot);
	});
};

// const targetURL = process.env.COVER_GEN_URL || 'http://localhost:3000';
exports.handler = async function (event, context) {
	// parse body of POST request to valid object and
	// use object destructuring to obtain target url
	const { targetURL, document } = JSON.parse(event.body);
	console.log("--> chromium.executablePath", await chromium.executablePath);
	console.log("--> process.env.EXCECUTABLE_PATH", process.env.EXCECUTABLE_PATH);

	// launch browser
	const browser = await puppeteer.launch({
		args: chromium.args,
		// get path to browser
		executablePath: await chromium.executablePath,
		headless: true,
	});

	console.log(browser.isConnected(), await browser.version());

	// open new page in browser
	const page = await browser.newPage();
	console.log(await page.title());

	// set the viewport of the page
	await page.setViewport({
		width: 1200,
		height: 628,
		deviceScaleFactor: 1,
	});

	// set the prefers-color-scheme to dark
	await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "dark" }]);

	// try {
	// } catch (err) {
	//   console.log('unable to generate image', err)
	// }

	// await browser.close()

	// navigate to target URL and get page details and screenshot
	try {
		//...
		await page.goto(targetURL, {
			timeout: 0,
		});

		const formCont = await page.waitForSelector("#form-cont", {
			hidden: true,
		});

		const h1 = await page.waitForSelector("#content h1");

		await h1.click();

		const titleInput = await page.waitForSelector("#title");
		const descInput = await page.waitForSelector("#description");
		const dateInput = await page.waitForSelector("#updatedAt");

		await titleInput.type(`${document.title}`);
		await descInput.type(`${document.description}`);
		await dateInput.type(`${document.updatedAt}`);

		console.log(
			"titleInput",
			await titleInput.evaluate((x) => {
				return x.value;
			})
		);
		console.log(
			"descInput",
			await descInput.evaluate((x) => {
				return x.value;
			})
		);
		console.log(
			"dateInput",
			await dateInput.evaluate((x) => {
				return x.value;
			})
		);

		await h1.click();

		// try {
		// 	await fs.promises.access(`./public/img/miracleio.me/articles/${document.slug}/cover.png`);
		// } catch (error) {
		// 	console.log("ERROR --- fs.promises.access -->", error);

		// 	try {
		// 		await fs.promises.mkdir(`/public/img/miracleio.me/articles/${document.slug}`);
		// 	} catch (err) {
		// 		console.log(err, "unable to create path");
		// 	}
		// }

		const screenshotBuffer = await page.screenshot({
			encoding: "binary",
			// path: `./public/img/miracleio.me/articles/${document.slug}/cover.png`,
		});

		const uploadOptions = {
			folder: `miracleio.me/covers/${document.slug}`,
			// public_id: `${document.slug}-${new Date().getTime()}`,
			public_id: "cover",
		};

		// const uploadScreenshot = (screenshot, options) => {
		// 	try {
		// 		return cloudinary.uploader
		// 			.upload_stream(uploadOptions, (error, result) => {
		// 				return result;
		// 			})
		// 			.end(screenshotBuffer);
		// 	} catch (err) {
		// 		return err;
		// 	}
		// };

		document.coverData = await uploadScreenshot(uploadOptions, screenshotBuffer);

		console.log(document.coverData);
		// close the browser
		await browser.close();

		// send the page details
		return {
			statusCode: 200,
			body: JSON.stringify({
				targetURL,
				coverData: document.coverData,
			}),
		};
	} catch (err) {
		console.log(err);
		await browser.close();

		return {
			statusCode: 400,
			body: JSON.stringify({
				err,
			}),
		};
	}
};
