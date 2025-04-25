-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'Genel',
ADD COLUMN     "tag" TEXT NOT NULL DEFAULT 'Etiket yok!';
