import React from 'react';
import '../../scss/components/_CodeFragment.scss';

interface Props {
  code: string;
}

const CodeFragment: React.FC<Props> = ({ code }) => {
  return (
    <div className="message">
      <pre className="code-fragment">
        <code>
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodeFragment;