export const authResetPasswordHtml = `
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Password reset</title>
		<link rel="stylesheet" href="/reset-password/index.css" />
	</head>
	<body>
		<div class="wrapper">
			<div class="body">
				<h1 class="body__title">Password reset!</h1>
				<a class="body__link" href=${process.env.CLIENT_URL}>Go Home!</a>
			</div>
		</div>
	</body>
</html>
`;
