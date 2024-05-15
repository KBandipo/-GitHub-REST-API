const getButton = document.getElementById("getButton");
const postButton = document.getElementById("postButton");
const resultDiv = document.getElementById("result");

// Function to make a GET request
function makeGetRequest() {
  // Make a GET request to fetch data related to issues or pull requests
  fetch(
    "https://api.github.com/repos/KBandipo/Alstride-E-commerce-Website/issues"
  )
    .then((response) => {
      console.log("Response status:", response.status);
      return response.json();
    })
    .then((data) => {
      console.log("Data fetched:", data);

      // Clear the resultDiv before displaying new data
      resultDiv.innerHTML = "";

      // Loop through each issue and display its title and URL
      data.forEach((issue) => {
        const issueLink = document.createElement("a");
        issueLink.href = issue.html_url;
        issueLink.textContent = issue.title;
        issueLink.target = "_blank"; // Open link in a new tab
        resultDiv.appendChild(issueLink);
        resultDiv.appendChild(document.createElement("br")); // Add line break
      });
    })
    .catch((error) => console.error("Error:", error));
}

// Function to make a POST request
function makePostRequest() {
  // Make a POST request to create a new issue or pull request
  fetch(
    "https://api.github.com/repos/KBandipo/Alstride-E-commerce-Website/issues",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "New Issue",
        body: "This is a new issue created via API.",
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // Display the response data in the result div
      resultDiv.innerText = JSON.stringify(data);
    })
    .catch((error) => console.error("Error:", error));
}

// Event listeners for button clicks
getButton.addEventListener("click", makeGetRequest);
postButton.addEventListener("click", makePostRequest);
