const cloudinary = require("cloudinary").v2;
cloudinary.config(require("../../cloudinary.config"));

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

module.exports = uploadScreenshot;
