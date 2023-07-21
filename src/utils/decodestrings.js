export default function decodeEntities(encodedString) {
    const parser = new DOMParser();
    const dom = parser.parseFromString(
      `<!doctype html><body>${encodedString}`,
      "text/html"
    );
    return dom.body.textContent;
  }