import { useRef } from 'react';
import { useFetcher } from 'react-router';
import { useDisclosure } from '@mantine/hooks';

import PreviewArticleModal from '../../utilities/miscUI/PreviewArticleModal';
import HelpPopover from '../../utilities/miscUI/HelpPopover';
import FormLoader from '../../utilities/miscUI/FormLoader';

import FormLevelError from '../root/FormLevelError';
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
                Requires a minimum of 10 characters and has a maximum of 70.
            </span>
        </>
    );
}

function BodyPopoverContent() {
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

export default function CreateArticleForm() {
    const fetcher = useFetcher();
    const formRef = useRef();

    const [opened, { open, close }] = useDisclosure();

    console.log(fetcher.data?.errors);

    return (
        <fetcher.Form
            method='POST'
            action='/new'
            className='create-article-form'
            ref={formRef}
        >
            <PreviewArticleModal
                title={new FormData(formRef.current).get('title')}
                body={new FormData(formRef.current).get('body')}
                opened={opened}
                close={close}
            />

            {fetcher.data?.errors?.formLevel !== null &&
                fetcher.data?.errors?.formLevel !== undefined && (
                    <FormLevelError errorText={fetcher.data.errors.formLevel} />
                )}

            <FormRow
                labelContent={
                    <>
                        <span>Title</span>
                        <HelpPopover content={<TitlePopoverContent />} />
                    </>
                }
                inputType='text'
                fieldName='title'
                error={fetcher.data?.errors?.title}
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
                error={fetcher.data?.errors?.body}
            />

            <div className='create-article-form-actions'>
                <button
                    className='preview-article'
                    type='button'
                    onClick={open}
                >
                    Preview
                </button>
                <button className='create-article' type='submit'>
                    {fetcher.state === 'idle' ? 'Publish' : <FormLoader />}
                </button>
            </div>
        </fetcher.Form>
    );
}
