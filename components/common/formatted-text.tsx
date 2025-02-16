import { FC } from 'react';

const FormattedText: FC<{ text: string }> = ({ text }) => {
  return (
    <>
      {text
        .split('\n')
        .map((paragraph) =>
          paragraph.trim() ? <p className='not-first:mt-[0.5em]' key={paragraph[0]}>{paragraph}</p> : null,
        )}
    </>
  );
};

export default FormattedText;
