-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "BookSize" AS ENUM ('Roghei', 'Kheshti', 'Rahli', 'Vaziri', 'Soltani', 'Gibi', 'Paltoei', 'Hamayeli', 'Janamazi', 'Beyazee');

-- CreateEnum
CREATE TYPE "BookCover" AS ENUM ('Shomiz', 'Kaghazi', 'Galingor', 'Sakht', 'Narm', 'Ghalaf', 'Zarrin', 'Makhmal', 'Cherm', 'Parcheh');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verificationCode" INTEGER,
    "verificationDate" TIMESTAMP(3),
    "bio" TEXT,
    "location" TEXT,
    "portfolioWebsite" TEXT,
    "reputation" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "imageId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "productId" TEXT,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Store" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Billboard" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "imageId" TEXT,

    CONSTRAINT "Billboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "storeId" TEXT NOT NULL,
    "billboardId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "imageId" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subTitle" TEXT,
    "originalTitle" TEXT,
    "description" TEXT,
    "price" DECIMAL(65,30) NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "size" TEXT,
    "publishDate" TIMESTAMP(3),
    "publisher" TEXT,
    "pages" TEXT,
    "weight" TEXT,
    "cover" TEXT,
    "edition" TEXT,
    "printSeries" TEXT,
    "summary" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "storeId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contributor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT,
    "role" TEXT[],
    "imageId" TEXT,
    "storeId" TEXT NOT NULL,

    CONSTRAINT "Contributor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "storeId" TEXT NOT NULL,
    "userId" TEXT,
    "productId" TEXT,
    "contributorId" TEXT,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "Authority" TEXT NOT NULL,
    "RefID" INTEGER,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "phone" TEXT NOT NULL DEFAULT '',
    "address" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "interactionId" INTEGER,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interaction" (
    "id" SERIAL NOT NULL,
    "action" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "answerId" TEXT,

    CONSTRAINT "Interaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ImageToStore" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_writer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_translator" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_editor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_illustrator" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_photographer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UpvotedQuestions" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DownvotedQuestions" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_QuestionToTag" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserWhoSaved" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UpvotedAnswers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DownvotedAnswers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TagToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Image_key_key" ON "Image"("key");

-- CreateIndex
CREATE INDEX "Image_productId_idx" ON "Image"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Store_name_key" ON "Store"("name");

-- CreateIndex
CREATE INDEX "Billboard_storeId_idx" ON "Billboard"("storeId");

-- CreateIndex
CREATE INDEX "Billboard_imageId_idx" ON "Billboard"("imageId");

-- CreateIndex
CREATE INDEX "Category_storeId_idx" ON "Category"("storeId");

-- CreateIndex
CREATE INDEX "Category_billboardId_idx" ON "Category"("billboardId");

-- CreateIndex
CREATE INDEX "Category_imageId_idx" ON "Category"("imageId");

-- CreateIndex
CREATE INDEX "Product_storeId_idx" ON "Product"("storeId");

-- CreateIndex
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");

-- CreateIndex
CREATE INDEX "Contributor_storeId_idx" ON "Contributor"("storeId");

-- CreateIndex
CREATE INDEX "Review_userId_idx" ON "Review"("userId");

-- CreateIndex
CREATE INDEX "Review_productId_idx" ON "Review"("productId");

-- CreateIndex
CREATE INDEX "Review_contributorId_idx" ON "Review"("contributorId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_Authority_key" ON "Order"("Authority");

-- CreateIndex
CREATE INDEX "Order_storeId_idx" ON "Order"("storeId");

-- CreateIndex
CREATE INDEX "OrderItem_orderId_idx" ON "OrderItem"("orderId");

-- CreateIndex
CREATE INDEX "OrderItem_productId_idx" ON "OrderItem"("productId");

-- CreateIndex
CREATE INDEX "Question_authorId_idx" ON "Question"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ImageToStore_AB_unique" ON "_ImageToStore"("A", "B");

-- CreateIndex
CREATE INDEX "_ImageToStore_B_index" ON "_ImageToStore"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_writer_AB_unique" ON "_writer"("A", "B");

-- CreateIndex
CREATE INDEX "_writer_B_index" ON "_writer"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_translator_AB_unique" ON "_translator"("A", "B");

-- CreateIndex
CREATE INDEX "_translator_B_index" ON "_translator"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_editor_AB_unique" ON "_editor"("A", "B");

-- CreateIndex
CREATE INDEX "_editor_B_index" ON "_editor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_illustrator_AB_unique" ON "_illustrator"("A", "B");

-- CreateIndex
CREATE INDEX "_illustrator_B_index" ON "_illustrator"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_photographer_AB_unique" ON "_photographer"("A", "B");

-- CreateIndex
CREATE INDEX "_photographer_B_index" ON "_photographer"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UpvotedQuestions_AB_unique" ON "_UpvotedQuestions"("A", "B");

-- CreateIndex
CREATE INDEX "_UpvotedQuestions_B_index" ON "_UpvotedQuestions"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DownvotedQuestions_AB_unique" ON "_DownvotedQuestions"("A", "B");

-- CreateIndex
CREATE INDEX "_DownvotedQuestions_B_index" ON "_DownvotedQuestions"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionToTag_AB_unique" ON "_QuestionToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionToTag_B_index" ON "_QuestionToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserWhoSaved_AB_unique" ON "_UserWhoSaved"("A", "B");

-- CreateIndex
CREATE INDEX "_UserWhoSaved_B_index" ON "_UserWhoSaved"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UpvotedAnswers_AB_unique" ON "_UpvotedAnswers"("A", "B");

-- CreateIndex
CREATE INDEX "_UpvotedAnswers_B_index" ON "_UpvotedAnswers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DownvotedAnswers_AB_unique" ON "_DownvotedAnswers"("A", "B");

-- CreateIndex
CREATE INDEX "_DownvotedAnswers_B_index" ON "_DownvotedAnswers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TagToUser_AB_unique" ON "_TagToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TagToUser_B_index" ON "_TagToUser"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Billboard" ADD CONSTRAINT "Billboard_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Billboard" ADD CONSTRAINT "Billboard_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_billboardId_fkey" FOREIGN KEY ("billboardId") REFERENCES "Billboard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contributor" ADD CONSTRAINT "Contributor_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contributor" ADD CONSTRAINT "Contributor_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_contributorId_fkey" FOREIGN KEY ("contributorId") REFERENCES "Contributor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_interactionId_fkey" FOREIGN KEY ("interactionId") REFERENCES "Interaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImageToStore" ADD CONSTRAINT "_ImageToStore_A_fkey" FOREIGN KEY ("A") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImageToStore" ADD CONSTRAINT "_ImageToStore_B_fkey" FOREIGN KEY ("B") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_writer" ADD CONSTRAINT "_writer_A_fkey" FOREIGN KEY ("A") REFERENCES "Contributor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_writer" ADD CONSTRAINT "_writer_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_translator" ADD CONSTRAINT "_translator_A_fkey" FOREIGN KEY ("A") REFERENCES "Contributor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_translator" ADD CONSTRAINT "_translator_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_editor" ADD CONSTRAINT "_editor_A_fkey" FOREIGN KEY ("A") REFERENCES "Contributor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_editor" ADD CONSTRAINT "_editor_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_illustrator" ADD CONSTRAINT "_illustrator_A_fkey" FOREIGN KEY ("A") REFERENCES "Contributor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_illustrator" ADD CONSTRAINT "_illustrator_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_photographer" ADD CONSTRAINT "_photographer_A_fkey" FOREIGN KEY ("A") REFERENCES "Contributor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_photographer" ADD CONSTRAINT "_photographer_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UpvotedQuestions" ADD CONSTRAINT "_UpvotedQuestions_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UpvotedQuestions" ADD CONSTRAINT "_UpvotedQuestions_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DownvotedQuestions" ADD CONSTRAINT "_DownvotedQuestions_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DownvotedQuestions" ADD CONSTRAINT "_DownvotedQuestions_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionToTag" ADD CONSTRAINT "_QuestionToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionToTag" ADD CONSTRAINT "_QuestionToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserWhoSaved" ADD CONSTRAINT "_UserWhoSaved_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserWhoSaved" ADD CONSTRAINT "_UserWhoSaved_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UpvotedAnswers" ADD CONSTRAINT "_UpvotedAnswers_A_fkey" FOREIGN KEY ("A") REFERENCES "Answer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UpvotedAnswers" ADD CONSTRAINT "_UpvotedAnswers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DownvotedAnswers" ADD CONSTRAINT "_DownvotedAnswers_A_fkey" FOREIGN KEY ("A") REFERENCES "Answer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DownvotedAnswers" ADD CONSTRAINT "_DownvotedAnswers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToUser" ADD CONSTRAINT "_TagToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToUser" ADD CONSTRAINT "_TagToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
