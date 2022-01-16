const googleOAuthURL = "https://accounts.google.com/o/oauth2/v2/auth";

const buildURLQuery = (obj) =>
  Object.entries(obj)
    .map((pair) => pair.map(encodeURIComponent).join("="))
    .join("&");

function constructOAuthLink({ scope, redirectUri, clientId }) {
  const responseType = "code";
  const queryObject = {
    scope: scope,
    response_type: responseType,
    redirect_uri: redirectUri,
    client_id: clientId,
  };

  return `${googleOAuthURL}?${buildURLQuery(queryObject)}`;
}

export default constructOAuthLink;