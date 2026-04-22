const fetch = require('node-fetch');

exports.handler = async function (event) {
  // URL: /.netlify/functions/embed?type=movie&id=687163
  const { type, id } = event.queryStringParameters;

  if (!type || !id) {
    return { statusCode: 400, body: 'Missing type or id' };
  }

  try {
    const url = `https://vidsrc.to/embed/${type}/${id}`;

    const response = await fetch(url, {
      headers: {
        // Pretend to be a real browser
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        Referer: 'https://vidsrc.to/',
      },
    });

    let html = await response.text();

    // Rewrite all relative URLs to point back to vidsrc.to
    html = html.replace(/(src|href)="\//g, `$1="https://vidsrc.to/`);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': '*',
      },
      body: html,
    };
  } catch (err) {
    return { statusCode: 500, body: 'Proxy error: ' + err.message };
  }
};
