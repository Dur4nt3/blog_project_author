export default function BodyPopoverContent() {
    return (
        <>
            <span className='popover-row'>
                The contents of your article, markdown can be used here to
                format you article.
            </span>
            <span className='popover-row'>
                The markdown specification used here is{' '}
                <a href='https://commonmark.org/' rel='noreferrer noopener'>
                    CommonMark
                </a>
                .
            </span>
            <span className='popover-row'>
                Requires a minimum of 500 characters and has a maximum of 10000
                characters.
            </span>

            <span className='popover-row'>
                Note: I suggest using a dedicated markdown editor (VSCode, or an
                online solution) to write your article in. Use this input solely
                to paste your finished article in, preview it, and perform minor
                tweaks on it.
            </span>
        </>
    );
}
