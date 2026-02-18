import { useRef } from 'react';
import { useFetcher } from 'react-router';
import { useDisclosure } from '@mantine/hooks';

import PreviewArticleModal from '../../utilities/miscUI/PreviewArticleModal';
import HelpPopover from '../../utilities/miscUI/HelpPopover';
import FormLoader from '../../utilities/miscUI/FormLoader';

import FormLevelError from '../root/FormLevelError';
import FormRow from '../root/FormRow';
import FormRowTextArea from '../root/FormRowTextArea';

import TitlePopoverContent from './TitlePopoverContent';
import DescriptionPopoverContent from './DescriptionPopoverContent';
import BodyPopoverContent from './BodyPopoverContent';
import ArticleData from '../../utilities/classes/ArticleData';
import { formatWithNamedMonth } from '../../utilities/formatDate';

export default function ArticleForm({
    actionRoute,
    method,
    classBase,
    authorName,
    articleData = {},
}) {
    const fetcher = useFetcher();
    const formRef = useRef();

    const [opened, { open, close }] = useDisclosure();

    return (
        <fetcher.Form
            method={method}
            action={actionRoute}
            className={`${classBase}-form`}
            ref={formRef}
        >
            <PreviewArticleModal
                article={
                    new ArticleData(
                        new FormData(formRef.current).get('title'),
                        new FormData(formRef.current).get('description'),
                        new FormData(formRef.current).get('body'),
                        articleData.createdAt
                            ? articleData.createdAt
                            : formatWithNamedMonth(new Date().toISOString()),
                        formatWithNamedMonth(new Date().toISOString())
                    )
                }
                authorName={authorName}
                opened={opened}
                close={close}
            />

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
                defaultValue={
                    articleData?.title !== undefined ? articleData?.title : ''
                }
            />

            <FormRowTextArea
                labelContent={
                    <>
                        <span>Excerpt/Summary</span>
                        <HelpPopover content={<DescriptionPopoverContent />} />
                    </>
                }
                fieldName='description'
                error={fetcher.data?.errors?.description}
                classes='short-text-area'
                defaultValue={
                    articleData?.description !== undefined
                        ? articleData?.description
                        : ''
                }
            />

            <FormRowTextArea
                labelContent={
                    <>
                        <span>Body (Markdown)</span>
                        <HelpPopover content={<BodyPopoverContent />} />
                    </>
                }
                fieldName='body'
                error={fetcher.data?.errors?.body}
                defaultValue={
                    articleData?.body !== undefined ? articleData?.body : ''
                }
            />

            {fetcher.data?.errors?.formLevel !== null &&
                fetcher.data?.errors?.formLevel !== undefined && (
                    <FormLevelError errorText={fetcher.data.errors.formLevel} />
                )}

            <div className={`${classBase}-form-actions`}>
                <button
                    className='preview-article'
                    type='button'
                    onClick={open}
                >
                    Preview
                </button>
                <button className={`${classBase}`} type='submit'>
                    {fetcher.state === 'idle' ? 'Publish' : <FormLoader />}
                </button>
            </div>
        </fetcher.Form>
    );
}
