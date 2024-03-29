'use client'

import * as z from 'zod'
// import axios from 'axios'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Trash, UploadCloud } from 'lucide-react'
import { Billboard, Image } from '@prisma/client'
import { useParams, usePathname, useRouter } from 'next/navigation'

import { Input } from '@/components/ui/input'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'

// import ImageUpload from "@/components/ui/image-upload"
// import { toast } from '@/components/ui/use-toast'

// import ImageUpload from '@/components/ImageUpload'
import { AlertModal } from '@/components/dashboard/modals/alert-modal'
import { Heading } from '@/components/dashboard/Heading'
import { cn } from '@/lib/utils'
import { createBillboardSchema } from '@/lib/schema/billboard'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import NextImage from 'next/image'
import { useFormState } from 'react-dom'
import { toast } from 'sonner'
import {
  createBillboard,
  deleteBillboard,
  editBillboard,
} from '@/lib/actions/dashboard/billboard'
import { SubmitButton } from '@/components/dashboard/SubmitButton'

type BillboardFormValues = z.infer<typeof createBillboardSchema>

//if there is any billboard its Billboard, else its null
interface BillboardFormProps {
  //there is a chance to have no initial data and in fact we're creating one.
  initialData: (Billboard & { image: Partial<Image> | null }) | null
}

export const BillboardForm: React.FC<BillboardFormProps> = ({
  initialData,
}) => {
  const params = useParams()
  const { storeId } = params
  const billboardId = initialData?.id

  const router = useRouter()
  const path = usePathname()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState('')
  // const [files, setFiles] = useState<File | null>(null)

  //Based on we get "new" or no billboard data, or we get billboardId as params we create or update billboard
  const title = initialData ? 'ویرایش بیلبورد' : 'ایجاد بیلبورد'
  const description = initialData
    ? 'ویرایش بیلبورد.'
    : 'اضافه کردن بیلبورد جدید'
  const toastMessage = initialData ? 'بیلبورد آپدیت شد.' : 'بیلبورد ایجاد شد.'
  const action = initialData ? 'ذخیره تغییرات' : 'ایجاد'

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(createBillboardSchema),
    //the second part is for 'null' cases
    defaultValues: initialData || {
      label: '',
      // image: null,
    },
  })
  const [formState, createAction] = useFormState(
    createBillboard.bind(null, path, storeId as string),
    {
      errors: {},
    }
  )
  const [editFormState, editAction] = useFormState(
    editBillboard.bind(null, path, storeId as string, billboardId as string),
    {
      errors: {},
    }
  )
  const [deleteState, deleteAction] = useFormState(
    deleteBillboard.bind(null, path, storeId as string, billboardId as string),
    {
      errors: {},
    }
  )

  useEffect(() => {
    if (formState?.errors?.label) {
      form.setError('label', {
        type: 'custom',
        message: formState?.errors.label?.join(' و '),
      })
    } else if (formState?.errors?.image) {
      form.setError('image', {
        type: 'custom',
        message: formState?.errors.image?.join(' و '),
      })
    } else if (formState?.errors?._form) {
      toast.error(formState?.errors._form?.join(' و '))
      form.setError('root', {
        type: 'custom',
        message: formState?.errors?._form?.join(' و '),
      })
    }
    return () => form.clearErrors()
  }, [form, formState])

  useEffect(() => {
    if (editFormState?.errors?.label) {
      form.setError('label', {
        type: 'custom',
        message: editFormState?.errors.label?.join(' و '),
      })
    } else if (editFormState?.errors?.image) {
      form.setError('image', {
        type: 'custom',
        message: editFormState?.errors.image?.join(' و '),
      })
    } else if (editFormState?.errors?._form) {
      toast.error(editFormState?.errors._form?.join(' و '))
      form.setError('root', {
        type: 'custom',
        message: editFormState?.errors?._form?.join(' و '),
      })
    }
    return () => form.clearErrors()
  }, [form, editFormState])

  const onSubmit = async (data: BillboardFormValues) => {
    try {
      console.log(data)
      // setLoading(true)
      // if (initialData) {
      //   await axios.patch(
      //     `/api/${params.storeId}/billboards/${params.billboardId}`,
      //     data
      //   )
      // } else {
      //   await axios.post(`/api/${params.storeId}/billboards`, data)
      // }
      // router.refresh()
      // router.push(`/${params.storeId}/billboards`)
      // toast({ title: toastMessage, variant: 'default' })
    } catch (error: any) {
      // toast({ title: 'مشکلی پیش آمده.', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    // try {
    //   setLoading(true)
    //   await axios.delete(
    //     `/api/${params.storeId}/billboards/${params.billboardId}`
    //   )
    //   router.refresh()
    //   router.push(`/${params.storeId}/billboards`)
    //   toast({ title: 'بیلبورد حذف شد.', variant: 'default' })
    // } catch (error: any) {
    //   toast({
    //     title:
    //       'مطمئن شوید ابتدا همه دسته‌بندی‌هایی که از این بیلبورد استفاده می‌کنند را حذف کرده‌اید.',
    //     variant: 'destructive',
    //   })
    // } finally {
    //   setLoading(false)
    //   setOpen(false)
    // }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={deleteAction}
        // loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {/* in case there is initial data it means we want to edit it */}
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          action={initialData ? editAction : createAction}
          // onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          {files && (
            <div
              // ratio={}
              className="relative mx-auto rounded-lg  h-96 w-[95%] max-w-xl "
            >
              <NextImage
                alt="billboard-pic"
                // src={initialData?.image ? initialData?.image?.url : files}
                src={files}
                // src={URL.createObjectURL(files)}
                fill
                className="object-cover rounded-lg"
              />
              <Trash
                className={cn(
                  buttonVariants({ variant: 'destructive', size: 'sm' }),
                  'absolute -top-1 -left-1 w-10 h-10 cursor-pointer '
                )}
                onClick={() => {
                  form.reset({ ...form.getValues(), image: null })
                  setFiles('')
                }}
              />
            </div>
          )}
          {/* // ) : ( */}
          {/* <> */}
          <label
            htmlFor="image"
            className={cn(
              'max-w-md mx-auto cursor-pointer bg-transparent rounded-xl flex flex-col justify-center gap-4 items-center border-2 border-black/20 dark:border-white/20 border-dashed w-full h-24 shadow ',
              files.length > 0 ? 'hidden' : ''
            )}
          >
            <span
              className={cn(
                buttonVariants({ variant: 'ghost' }),

                'flex flex-col items-center justify-center gap-2 h-64 w-full'
              )}
            >
              <UploadCloud />
              انتخاب عکس
            </span>
          </label>
          <input
            name="image"
            id="image"
            className="hidden"
            type="file"
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : null
              if (file) {
                form.setValue('image', URL.createObjectURL(file))
                setFiles(URL.createObjectURL(file))
              }
            }}

            // formAction={formAction}
            // accept="images/*"
            // onChange={async (event) => {
            //   event.preventDefault()
            //   // const dataTransfer = new DataTransfer()

            //   // dataTransfer.items.add(event?.target?.files?.[0])

            //   // Validate and update uploaded file
            //   // const newFiles = dataTransfer.files[0]

            //   setFiles(event?.target?.files?.[0])
            // }}
          />
          {/* <FormMessage>{form.formState?.errors?.image?.message}</FormMessage> */}
          <FormMessage>
            {form.getFieldState('image')?.error?.message}
          </FormMessage>
          {/* </> */}
          {/* )} */}
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem className="max-w-md">
                <FormLabel>عنوان</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="عنوان بیلبورد"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* {files ? (
            <div
              // ratio={}
              className="relative mx-auto rounded-lg  h-96 w-96"
            >
              <Image
                alt="billboard-pic"
                // src={files}
                src={URL.createObjectURL(files)}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ) : (
             )} */}
          {/* <FormField
            control={form.control}
            name="image"
            render={({ field: { onChange }, ...field }) => (
              <FormItem>
                <FormLabel
                  className={cn(
                    'max-w-md mx-auto cursor-pointer bg-transparent rounded-xl flex flex-col justify-center gap-4 items-center border-2 border-black/20 dark:border-white/20 border-dashed w-full h-24 shadow ',
                    !!files ? 'hidden' : ''
                  )}
                >
                  <span
                    className={cn(
                      buttonVariants({ variant: 'ghost' }),
                      'flex flex-col items-center justify-center gap-2 h-96 w-96'
                    )}
                  >
                    <UploadCloud />
                    انتخاب عکس
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    // formAction={formAction}
                    // {...field}
                    // multiple={true}
                    // disabled={form.formState.isSubmitting}
                    // value={field.value ? [field.value] : []}
                    onChange={async (event) => {
                      event.preventDefault()

                      const file = event.target.files
                        ? event.target.files[0]
                        : null

                      console.log(file)
                      onChange(file)

                      // setFiles(file)
                      form.setValue('image', file)
                      if (file) {
                        const reader = new FileReader()
                        reader.onloadend = () => {
                          setFiles(reader.result as string)
                        }
                        reader.readAsDataURL(file)
                      }
                    }}
                  />
                </FormControl>

                <FormMessage className="dark:text-rose-400" />
              </FormItem>
            )}
          /> */}

          {/* <div className="md:grid md:grid-cols-3 gap-8"> */}

          {/* </div> */}
          <SubmitButton className="ml-auto">{action}</SubmitButton>
        </form>
      </Form>
    </>
  )
}
