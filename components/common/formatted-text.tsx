import { FC } from 'react';

const FormattedText: FC<{ text: string }> = ({ text }) => {
  return (
    <>
      {text.split('\n').map((paragraph, index) =>
        paragraph.trim() ? (
          <p className='not-first:mt-[0.5em]' key={`${paragraph}-${index}`}>
            {paragraph}
          </p>
        ) : null,
      )}
    </>
  );
};

export default FormattedText;
