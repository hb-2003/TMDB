export const emailTemplate = (title: string, content: string): string => {
  return `
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="icon" href="{{ asset('user/images/fav.png') }}" type="image/x-icon">
  <link rel="shortcut icon" href="{{ asset('user/images/fav.png') }}" type="image/x-icon">
  <title>${title}</title>
  <link href="https://fonts.googleapis.com/css?family=Work+Sans:100,200,300,400,500,600,700,800,900" rel="stylesheet">
  <link
    href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
    rel="stylesheet">
  <link
    href="https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i"
    rel="stylesheet">
  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
  <style type="text/css">
    body {
      font-family: 'Work Sans', sans-serif;
      background-color: #f6f7fb;
    }

    .email-container {
      max-width: 650px;
      margin: 30px auto;
      background-color: #fff;
      border-radius: 8px;
      padding: 30px;
    }

    .email-header img {
      max-width: 150px;
    }

    .email-footer {
      text-align: center;
      color: #999;
      margin-top: 30px;
    }

    .email-footer a {
      color: #007bff;
      text-decoration: none;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center my-4">
        <img src="https://via.placeholder.com/150" alt="logo" class="email-header">
      </div>
    </div>
    <div class="row">
      <div class="col-12 email-container">
        <h6 class="font-weight-bold">${title}</h6>
        ${content}
        <p>Regards,<br>TMDB Team</p>
      </div>
    </div>
    <div class="row">
      <div class="col-12 email-footer">
        <p>&copy; 2020 TMDB. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>

</html>
`;
};
