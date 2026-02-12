import { useFetcher } from 'react-router';

import HelpPopover from '../../utilities/miscUI/HelpPopover';
import FormLoader from '../../utilities/miscUI/FormLoader';

import FormRow from '../root/FormRow';
import FormRowTextArea from '../root/FormRowTextArea';

function TitlePopoverContent() {
    return (
        <>
            <span className='popover-row'>
                A concise title for your article, ideally between 50-70
                characters.
            </span>
            <span className='popover-row'>
                Note: Requires a minimum of 20 characters and has a maximum of
                70.
            </span>
        </>
    );
}

function BodyPopoverContent() {
    return (
        <>
            <span className='popover-row'>
                The contents of your article, markdown used here will be parsed
                in the published article.
            </span>
            <span className='popover-row'>
                Note: Requires a minimum of 500 characters and has a maximum of
                10000 characters.
            </span>
        </>
    );
}

export default function CreateArticleForm() {
    const fetcher = useFetcher();

    return (
        <fetcher.Form
            method='POST'
            action='/new'
            className='create-article-form'
        >
            <FormRow
                labelContent={
                    <>
                        <span>Title</span>
                        <HelpPopover content={<TitlePopoverContent />} />
                    </>
                }
                inputType='text'
                fieldName='title'
                error={fetcher.data?.errors !== undefined ? true : undefined}
            />

            <FormRowTextArea
                labelContent={
                    <>
                        <span>Body (Markdown)</span>
                        <HelpPopover content={<BodyPopoverContent />} />
                    </>
                }
                inputType='text'
                fieldName='body'
                error={fetcher.data?.errors !== undefined ? true : undefined}
            />

            <div className="create-article-form-actions">
                <button className='preview-article' type='button'>Preview</button>
                <button className='create-article' type='submit'>{fetcher.state === 'idle' ? 'Publish' : <FormLoader />}</button>
            </div>
        </fetcher.Form>
    );
}
