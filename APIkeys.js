/**
 * Retrieve user property or ask the user if the property does not exist yet.
 */
function getApiKey(propertyName, displayName) {
  const userProperties = PropertiesService.getUserProperties();
  let value = userProperties.getProperty(propertyName);

  if (!value) {
    const response = Browser.inputBox(
      `Configuration : ${displayName}`,
      `Please enter your ${displayName} :`,
      Browser.Buttons.OK_CANCEL
    );

    if (response !== "cancel" && response.trim() !== "") {
      value = response.trim();
      userProperties.setProperty(propertyName, value);
    } else {
      throw new Error(`'${displayName}' is required to use the automatic application.`);
    }
  }

  return value;
}

// Raccourcis pour tes deux clés :
function getGeminiApiKey() {
  return getApiKey("GEMINI_API_KEY", "API Key Gemini");
}

function getGoogleMapsApiKey() {
  return getApiKey("MAPS_API_KEY", "API Key Google Maps");
}
