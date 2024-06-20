export const blogsData = [
    {
        id: 1, title: 'Git LFS (large file system) hell', content: `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Managing Large Files in Next.js with Git LFS</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
        }
        h1 {
            color: #333;
        }
        code {
            background-color: #eee;
            padding: 2px 4px;
            border-radius: 4px;
        }
        pre {
            background-color: #eee;
            padding: 10px;
            border-radius: 4px;
            overflow-x: auto;
        }
        .container {
            max-width: 800px;
            margin: auto;
            background: #fff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Managing Large Files in Next.js with Git LFS</h1>

        <p>
            I recently faced an intriguing challenge while working on my Next.js project. I had some large image files that I decided to manage using Git LFS (Large File Storage). However, things didn’t go as smoothly as I anticipated. Here's how I navigated through the obstacles and what I learned along the way.
        </p>

        <h2>Step 1: Setting Up Git LFS</h2>

        <p>The first step was to set up Git LFS in my project. This was straightforward:</p>
        <pre><code>git lfs install</code></pre>
        
        <p>I then tracked my large files:</p>
        <pre><code>git lfs track "*.png"</code></pre>
        
        <p>Everything seemed to be in place. I added the files, committed them, and pushed them to the repository:</p>
        <pre><code>git add public/example.png
git commit -m "Add large image file to LFS"
git push origin main</code></pre>

        <h2>Step 2: The Unexpected Hiccup</h2>

        <p>However, when I pulled my project on another machine, the image in the <code>/public</code> directory was just a pointer file and not the actual image. My Next.js app couldn’t read it.</p>

        <h2>Step 3: Pulling LFS Files</h2>

        <p>I needed to ensure that Git LFS pulls the actual files. I ran:</p>
        <pre><code>git lfs pull</code></pre>

        <p>This command fetched the actual image content. I checked to make sure the image was correctly placed in the <code>/public</code> directory.</p>
        <pre><code>ls -lh public/example.png</code></pre>

        <h2>Step 4: Untracking Files from LFS</h2>

        <p>Later, I decided to untrack the files from Git LFS and revert to normal Git tracking. Here’s how I did it:</p>

        <h3>Remove Tracking:</h3>
        <p>First, I updated the <code>.gitattributes</code> file to stop tracking the image type with LFS:</p>
        <pre><code>git lfs untrack "*.png"</code></pre>

        <h3>Commit Changes:</h3>
        <p>I committed the changes to <code>.gitattributes</code>:</p>
        <pre><code>git add .gitattributes
git commit -m "Stop tracking PNG files with LFS"</code></pre>

        <h3>Convert LFS Files to Normal Files:</h3>
        <p>To convert the LFS files back to normal files, I needed to re-commit them:</p>
        <pre><code>git add public/example.png
git commit -m "Recommit PNG files as regular Git files"
git push origin main</code></pre>

        <h3>Verify File Presence:</h3>
        <p>I verified that the files were correctly untracked and present in the <code>/public</code> directory as regular files.</p>
        <pre><code>git lfs ls-files</code></pre>

        <p>The files were no longer listed, indicating they were successfully untracked.</p>

        <h2>Step 5: Ensuring Deployment Works</h2>

        <p>I made sure my deployment process didn’t depend on LFS anymore. For instance, in Vercel, I removed any LFS-specific commands from <code>vercel.json</code>.</p>

        <p>Here’s an example if you’re using <code>vercel.json</code>:</p>
        <pre><code>{
  "builds": [
    {
      "src": "next.config.js",
      "use": "@vercel/next"
    }
  ]
}</code></pre>

        <p>No need for a <code>build</code> hook to pull LFS files anymore.</p>

        <h2>Step 6: Final Testing</h2>

        <p>Finally, I tested my application locally and after deployment to ensure that everything worked seamlessly. The images in the <code>/public</code> directory were correctly loaded by Next.js without any issues.</p>

        <h2>Conclusion</h2>

        <p>
            Through this journey, I learned the nuances of managing large files with Git LFS and how to transition back to normal Git tracking. Documenting these steps not only helped me solve the problem but also turned out to be a valuable learning experience.
        </p>
        <p>
            In my portfolio blog, I hope this narrative helps others facing similar challenges. If you’re diving into Git LFS, remember to thoroughly test your setup, especially if you plan to untrack files later. Happy coding! 🚀
        </p>
    </div>
</body>
</html>
`},

]