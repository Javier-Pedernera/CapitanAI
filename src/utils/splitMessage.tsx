
interface MessagePart {
    content: string | null;
    isCode?: boolean;
  }
  
  export const splitMessage = (message: string): MessagePart[] => {
    const parts: MessagePart[] = [];
    let currentIndex = 0;
  
    while (currentIndex < message.length) {
      const codeStartIndex = message.indexOf('<CODIGO>', currentIndex);
      if (codeStartIndex === -1) {
        const remainingContent = message.slice(currentIndex);
        parts.push({ content: remainingContent, isCode: false });
        break;
      }
      const beforeCode = message.slice(currentIndex, codeStartIndex);
      if (beforeCode) {
        parts.push({ content: beforeCode, isCode: false });
      }
      const codeEndIndex = message.indexOf('</CODIGO>', codeStartIndex);
      if (codeEndIndex === -1) {
        // No se encontró el final del código, el mensaje está mal formateado IMPORTANTE PARA DETECTAR ERROR
        console.error('Mensaje mal formateado: no se encontró el final del código.');
        return [];
      }
      const code = message.slice(codeStartIndex + '<CODIGO>'.length, codeEndIndex);
      parts.push({ content: code, isCode: true });
  
      currentIndex = codeEndIndex + '</CODIGO>'.length;
    }
  
    return parts;
  };