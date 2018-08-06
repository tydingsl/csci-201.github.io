for f in *.md; do pandoc -f markdown_github+tex_math_dollars "$f" --standalone --smart --latexmathml --css=./default.css --normalize -o "../${f%.md}.html"; done
