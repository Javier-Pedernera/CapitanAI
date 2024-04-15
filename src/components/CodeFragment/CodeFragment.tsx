import React, { useState } from 'react';
import '../../scss/components/_CodeFragment.scss';
import { LiaClipboard, LiaClipboardCheckSolid } from 'react-icons/lia';
import CopyToClipboard from 'react-copy-to-clipboard';
import 'balloon-css';

interface Props {
    code: string;
}

const CodeFragment: React.FC<Props> = ({ code }) => {

    const [codeCopy, setCodeCopy] = useState(false);
    // console.log("code puro a codeFragment",code);

    const editedCode = code.trim()
    // console.log("editedCode",editedCode);
    const edcod = editedCode.split("```")
    // console.log("edcod",edcod);
    let language = null
    let codeContent = null
    if (edcod.length == 1) {
        codeContent = edcod[0]
    } else {
        const firstNewlineIndex = edcod[1].indexOf('\n');
        // console.log(`indexof de barra y n esta en `,firstNewlineIndex);

        // Dividir el string en dos partes en función de la posición de la primera ocurrencia de '\n'
        language = edcod[1].substring(0, firstNewlineIndex);
        codeContent = edcod[1].substring(firstNewlineIndex + 1);
    }


    console.log("language", language);
    // console.log("codeContent", codeContent);

    return (
        <div className="message">
            <div className='lang_style'>
                {
                    language ? <div className='styleLanguage'>{language}</div> : <div></div>
                }

                <CopyToClipboard text={codeContent}
                    onCopy={() => {
                        setCodeCopy(true);
                    }}>
                    {codeCopy ? <button className='btn_copy'><LiaClipboardCheckSolid className='icoCopied' />Copied code!</button> : <button aria-label="Copy" data-balloon-pos="down" className='btn_copy'><LiaClipboard className='icoCopy' />Copy code</button>
                    }</CopyToClipboard>
            </div>

            <pre className="code-fragment">

                <code lang={language ? language : ""}>
                    {codeContent}
                </code>
            </pre>
        </div>
    );
};

export default CodeFragment;