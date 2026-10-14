"""Render the homepage's latest posts from Material's resolved blog archive."""

import re

from mkdocs.exceptions import PluginError


MARKER = "<!-- recent-posts -->"


def on_page_markdown(markdown, *, page, config, files):
    if page.file.src_uri != "index.md":
        return markdown
    if markdown.count(MARKER) != 1:
        raise PluginError("The homepage must contain one recent-posts marker.")

    # Material has already filtered drafts and resolved dated post URLs.
    posts = sorted(
        (post for post in config.plugins["material/blog"].blog.posts
         if not post.config.draft),
        key=lambda post: post.config.date.created,
        reverse=True,
    )[:3]
    entries = []
    for post in posts:
        title = re.sub(r"([\\`*_\[\]])", r"\\\1", post.title)
        date = post.config.date.created
        label = f"{date:%B} {date.day}, {date.year}"
        entries.append(f"- **[{title}](<{post.file.src_uri}>)** · {label}")

    return markdown.replace(MARKER, "\n".join(entries) or "Blog updates will appear here.")
