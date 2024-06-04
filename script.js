const getButton = document.getElementById("getButton");
const postButton = document.getElementById("postButton");
const resultDiv = document.getElementById("result");
const issueTitleInput = document.getElementById("issueTitle");
const issueBodyInput = document.getElementById("issueBody");

// Function to make a GET request
function makeGetRequest() {
  fetch("https://api.github.com/repos/KBandipo/GitHub-REST-API/issues")
    .then((response) => response.json())
    .then((data) => {
      resultDiv.innerHTML = "";
      data.forEach((issue) => {
        const issueLink = document.createElement("a");
        issueLink.href = issue.html_url;
        issueLink.textContent = issue.title;
        issueLink.target = "_blank"; // Open link in a new tab
        resultDiv.appendChild(issueLink);
        resultDiv.appendChild(document.createElement("br"));
      });
    })
    .catch((error) => console.error("Error fetching issues:", error));
}

// Function to make a POST request
function makePostRequest() {
  const title = issueTitleInput.value;
  const body = issueBodyInput.value;

  // GitHub access token
  const accessToken = "";

  fetch("https://api.github.com/repos/KBandipo/GitHub-REST-API/issues", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ title, body }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to create issue! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      resultDiv.innerText = `New Issue Created: ${data.title}`;
    })
    .catch((error) => console.error("Error creating issue:", error));
}

// Event listeners for button clicks
getButton.addEventListener("click", makeGetRequest);
postButton.addEventListener("click", makePostRequest);
