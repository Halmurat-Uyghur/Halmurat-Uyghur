import fetch from "node-fetch";
import fs from 'fs';

// const fetch = require('node-fetch');
// const fs = require('fs');

// GraphQL query
const gqlQuery = {
    query: `query {
  publication(host: "www.halmurattahir.com"){
    posts(first: 5) {
      edges {
        node {
          title,
          brief,
          url,
          coverImage {
            url
          }
        }
      }
    }
  }
}`
};

// fetch the latest blog posts
async function fetchBlogPosts() {
    try {
        const response = await fetch('https://gql.hashnode.com/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(gqlQuery)
        });

        const jsonResponse = await response.json();
        console.log("Fetched Data:", JSON.stringify(jsonResponse, null, 2)); // Add this line
        return jsonResponse;

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching blog posts:', error);
    }
}

// Update the README file
async function updateReadme() {
    const data = await fetchBlogPosts();

    if (!data || !data.data || !data.data.publication || !data.data.publication.posts || !data.data.publication.posts.edges) {
        console.error('Invalid data structure:', JSON.stringify(data, null, 2));
        return;
    }

    // Generate HTML table
    let tableContent = '<table>\n';
    tableContent += '<tr><th>Cover Image</th><th>Title</th><th>Brief</th><th>Link</th></tr>\n'; // Table headers

    data.data.publication.posts.edges.forEach(edge => {
        const coverImageUrl = edge.node.coverImage ? edge.node.coverImage.url : 'URL_of_default_image'; // Provide a URL for a default image or leave it empty
        const coverImageTag = coverImageUrl ? `<img src="${coverImageUrl}" alt="No Image" style="max-width:100px; max-height:100px;">` : 'No image';

        tableContent += `<tr>
            <td>${coverImageTag}</td>
            <td>${edge.node.title}</td>
            <td>${edge.node.brief}</td>
            <td><a href="${edge.node.url}">Read more</a></td>
        </tr>\n`;
    });

    tableContent += '</table>\n';

    // Read the README content
    const readmePath = 'README.md';
    let readmeContent = fs.readFileSync(readmePath, 'utf8');

    const startMarker = '<!-- BLOG:START -->';
    const endMarker = '<!-- BLOG:END -->';

    // Find where to insert the blog table
    const start = readmeContent.indexOf(startMarker);
    const end = readmeContent.indexOf(endMarker);

    if (start !== -1 && end !== -1 && end > start) {
        // Insert the blog table between the markers
        readmeContent = readmeContent.substring(0, start + startMarker.length) +
            '\n' + tableContent + '\n' +
            readmeContent.substring(end);
    } else {
        console.error('Could not find place to insert blog posts in README.md');
        return;
    }

    // Write the updated content to README.md
    fs.writeFileSync(readmePath, readmeContent);
    console.log('README updated successfully!');
}

updateReadme();