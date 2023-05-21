-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "hashed_password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "dob_day" INTEGER NOT NULL,
    "dob_month" INTEGER NOT NULL,
    "dob_year" INTEGER NOT NULL,
    "show_gender" BOOLEAN NOT NULL,
    "gender_identity" TEXT NOT NULL,
    "gender_interest" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profile_image" TEXT NOT NULL,
    "about" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_likes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Message_authorId_idx" ON "Message"("authorId");

-- CreateIndex
CREATE INDEX "Message_recipientId_idx" ON "Message"("recipientId");

-- CreateIndex
CREATE UNIQUE INDEX "_likes_AB_unique" ON "_likes"("A", "B");

-- CreateIndex
CREATE INDEX "_likes_B_index" ON "_likes"("B");
