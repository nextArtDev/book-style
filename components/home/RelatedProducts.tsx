import { FC } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ContributorFullStructure } from '@/lib/queries/home/contributors'
import FlipCover from './product/3d-cover/FlipCover'
import Link from 'next/link'
import HorizontalScrollCarousel from './horizontal-carousel/HorizontalScrollCarousel '

interface RelatedProductsProps {
  contributor: ContributorFullStructure
}

const RelatedProducts: FC<RelatedProductsProps> = ({ contributor }) => {
  let defaultValue

  if (contributor?.writer.length > 0) {
    defaultValue = 'نویسنده'
  } else if (contributor?.Translator.length > 0) {
    defaultValue = 'مترجم'
  } else if (contributor?.editor.length > 0) {
    defaultValue = 'ویراستار'
  } else if (contributor?.photographer.length > 0) {
    defaultValue = 'عکاس'
  } else if (contributor?.illustrator.length > 0) {
    defaultValue = 'تصویرساز'
  }

  const writerCards = contributor.writer?.map((card) => ({
    url: card.images?.[0].url,
    title: card.title,
    id: card.id,
    cover: card.cover,
  }))
  const translatorCards = contributor.Translator?.map((card) => ({
    url: card.images?.[0].url! || '',
    title: card.title,
    id: card.id,
    cover: card.cover,
  }))
  const editorCards = contributor.editor?.map((card) => ({
    url: card.images?.[0].url! || '',
    title: card.title,
    id: card.id,
    cover: card.cover,
  }))
  const illustratorCards = contributor.illustrator?.map((card) => ({
    url: card.images?.[0].url! || '',
    title: card.title,
    id: card.id,
    cover: card.cover,
  }))
  const photographerCards = contributor.photographer?.map((card) => ({
    url: card.images?.[0].url! || '',
    title: card.title,
    id: card.id,
    cover: card.cover,
  }))
  return (
    <div>
      <Tabs
        dir="rtl"
        defaultValue={defaultValue}
        className="w-full overflow-x-hidden my-8 -mr-2 "
      >
        <TabsList className="mx-4">
          {contributor?.writer.length > 0 && (
            <TabsTrigger className="w-full" value="نویسنده">
              نویسنده
            </TabsTrigger>
          )}
          {contributor?.Translator.length > 0 && (
            <TabsTrigger className="w-full" value="مترجم">
              مترجم
            </TabsTrigger>
          )}
          {contributor?.editor.length > 0 && (
            <TabsTrigger className="w-full" value={'ویراستار'}>
              ویراستار
            </TabsTrigger>
          )}
          {contributor?.photographer.length > 0 && (
            <TabsTrigger className="w-full" value={'عکاس'}>
              عکاس
            </TabsTrigger>
          )}
          {contributor.illustrator.length > 0 && (
            <TabsTrigger className="w-full" value={'تصویرساز'}>
              تصویرساز
            </TabsTrigger>
          )}
        </TabsList>
        {contributor.writer && (
          <TabsContent
            className=" mx-0 grid grid-cols-2 sm:grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4"
            value="نویسنده"
          >
            {/* <HorizontalScrollCarousel
              // @ts-ignore
              cards={writerCards}
              rtl={true}
              className=""
            /> */}
            {contributor.writer.map((writer) => (
              <Link key={writer.id} href={`/products/${writer.id}`}>
                <FlipCover
                  title={writer.title}
                  cover={writer.cover}
                  url={writer.images?.[0].url!}
                  className="p-2"
                />
              </Link>
            ))}
          </TabsContent>
        )}
        {contributor.Translator && (
          <TabsContent
            className=" mx-0 grid grid-cols-2 sm:grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4"
            value="مترجم"
          >
            {/* <HorizontalScrollCarousel
              cards={translatorCards}
              rtl={true}
              className=""
            /> */}
            {contributor.Translator.map((Translator) => (
              <Link key={Translator.id} href={`/products/${Translator.id}`}>
                <FlipCover
                  title={Translator.title}
                  cover={Translator.cover}
                  url={Translator.images?.[0].url!}
                  className="p-2"
                />
              </Link>
            ))}
          </TabsContent>
        )}
        {contributor.editor && (
          <TabsContent
            className=" mx-0 grid grid-cols-2 sm:grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4"
            value="ویراستار"
          >
            {/* <HorizontalScrollCarousel
              cards={editorCards}
              rtl={true}
              className=""
            /> */}
            {contributor.editor.map((editor) => (
              <Link key={editor.id} href={`/products/${editor.id}`}>
                <FlipCover
                  title={editor.title}
                  cover={editor.cover}
                  url={editor.images?.[0].url!}
                  className="p-2"
                />
              </Link>
            ))}
          </TabsContent>
        )}
        {contributor.photographer && (
          <TabsContent
            className=" mx-0 grid grid-cols-2 sm:grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4"
            value="عکاس"
          >
            {/* <HorizontalScrollCarousel
              cards={photographerCards}
              rtl={true}
              className=""
            /> */}
            {contributor.photographer.map((photographer) => (
              <Link key={photographer.id} href={`/products/${photographer.id}`}>
                <FlipCover
                  title={photographer.title}
                  cover={photographer.cover}
                  url={photographer.images?.[0].url!}
                  className="p-2"
                />
              </Link>
            ))}
          </TabsContent>
        )}
        {contributor.illustrator && (
          <TabsContent
            className=" mx-0 grid grid-cols-2 sm:grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4"
            value="تصویرساز"
          >
            {' '}
            {/* <HorizontalScrollCarousel
              cards={illustratorCards}
              rtl={true}
              className=""
            /> */}
            {contributor.illustrator.map((illustrator) => (
              <Link key={illustrator.id} href={`/products/${illustrator.id}`}>
                <FlipCover
                  title={illustrator.title}
                  cover={illustrator.cover}
                  url={illustrator.images?.[0].url!}
                  className="p-2"
                />
              </Link>
            ))}
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}

export default RelatedProducts
