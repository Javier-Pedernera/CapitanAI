import React, { useState } from 'react';
import '../../scss/components/_CodeFragment.scss';
import { LiaClipboard, LiaClipboardCheckSolid } from 'react-icons/lia';
import CopyToClipboard from 'react-copy-to-clipboard';

interface Props {
    code: string;
}

const CodeFragment: React.FC<Props> = ({ code }) => {

    const [codeCopy, setCodeCopy] = useState(false);

    const editedCode = code.trim()
    const edcod = editedCode.split("```")
    const firstNewlineIndex = edcod[1].indexOf('\n');
    // Dividir el string en dos partes en función de la posición de la primera ocurrencia de '\n'
    const language = edcod[1].substring(0, firstNewlineIndex);
    const codeContent = edcod[1].substring(firstNewlineIndex + 1);

    console.log("language", language);
    console.log("codeContent", codeContent);

    return (
        <div className="message">
            <div className='lang_style'>
                <div >{language}</div>
                <CopyToClipboard text={codeContent}
              onCopy={() => {
                setCodeCopy(true);
              }}>
                {codeCopy ? <button className='btn_copy'><LiaClipboardCheckSolid className='icoCopied'/>Copied code!</button> : <button className='btn_copy'><LiaClipboard className='icoCopy'/>Copy code</button>
                }</CopyToClipboard>
            </div>

            <pre className="code-fragment">

                <code lang={language}>
                    {codeContent}
                </code>
            </pre>
        </div>
    );
};

export default CodeFragment;