type CodeChunk = {
  id: string;
  filePath: string;
  type: string;
  content: string;
};

export function codeChunker(
  filePath: string,
  code: string
): CodeChunk[] {
  const chunks: CodeChunk[] = [];

  const regex =
    /(export\s+(?:default\s+)?(?:async\s+)?function\s+\w+[\s\S]*?(?=\nexport|\Z))|(export\s+class\s+\w+[\s\S]*?(?=\nexport|\Z))|(export\s+const\s+\w+[\s\S]*?(?=\nexport|\Z))|(export\s+interface\s+\w+[\s\S]*?(?=\nexport|\Z))|(export\s+type\s+\w+[\s\S]*?(?=\nexport|\Z))/gm;

  const matches = code.match(regex);

  if (!matches) {
    return [
      {
        id: `${filePath}-0`,
        filePath,
        type: "file",
        content: code,
      },
    ];
  }

  matches.forEach((match, index) => {
    let type = "unknown";

    if (match.includes("function")) type = "function";
    else if (match.includes("class")) type = "class";
    else if (match.includes("interface")) type = "interface";
    else if (match.includes("type")) type = "type";
    else if (match.includes("const")) type = "const";

    chunks.push({
      id: `${filePath}-${index}`,
      filePath,
      type,
      content: match.trim(),
    });
  });

  return chunks;
}