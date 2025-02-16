import { ChangeEvent, useState } from 'react';
import { useForm, UseFormProps } from 'react-hook-form';

import { checkFileType } from '@rock/lib/utils';
import { NewPostForm } from '@rock/models/post.model';

import {
  newPostFormSchema,
  VALID_POST_IMG_TYPES,
} from '@rock/schemas/post.schema';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

export type UseNewPostFormProps = {
  cb: (values: NewPostForm) => void | Promise<void>;
  props?: UseFormProps<NewPostForm>;
};

export default function useNewPostForm(
  cb: UseNewPostFormProps['cb'],
  props: UseNewPostFormProps['props'] = {},
) {
  const [loading, setLoading] = useState(false);

  const form = useForm<NewPostForm>({
    resolver: zodResolver(newPostFormSchema),
    defaultValues: {
      text: '',
      images: [],
    },
    mode: 'onChange',
    ...props,
  });

  async function onSubmit(values: NewPostForm) {
    try {
      setLoading(true);
      form.clearErrors();

      await cb(values);

      form.reset();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function addFile(e: ChangeEvent<HTMLInputElement>) {
    const currentFiles = form.getValues('images') ?? [];

    if (currentFiles.length > 3) {
      toast.error('Maximo de fotos alcanzado', {
        position: 'top-center',
      });
      return;
    }
    
    if (!e.target.files) throw Error('Input must be of type file');

    const file = e.target.files[0];

    if (!checkFileType(file, VALID_POST_IMG_TYPES)) {
      toast.error('Tipo de archivo no admitido', {
        position: 'top-center',
      });
      return;
    }

    const newFilePreview = URL.createObjectURL(file);

    form.setValue('images', [...currentFiles, newFilePreview]);
  }

  function removeFile(src: string) {
    const currentFiles = form.getValues('images') ?? [];

    if (!currentFiles?.length) return;

    const newFileState = currentFiles.filter((value) => value !== src);

    form.setValue('images', newFileState);
  }

  return { loading, onSubmit, form, addFile, removeFile };
}
