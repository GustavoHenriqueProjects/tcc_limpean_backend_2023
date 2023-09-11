-- CreateTable
CREATE TABLE `tbl_estado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(30) NOT NULL,
    `sigla` VARCHAR(2) NOT NULL,

    UNIQUE INDEX `tbl_estado_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_cidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `id_estado` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_cidade_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_endereco` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `logradouro` VARCHAR(45) NOT NULL,
    `bairro` VARCHAR(45) NOT NULL,
    `cep` VARCHAR(10) NOT NULL,
    `numero_residencia` VARCHAR(10) NOT NULL,
    `complemento` VARCHAR(100) NULL,
    `id_cidade` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_endereco_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_tipo_residencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `tbl_tipo_residencia_nome_key`(`nome`),
    UNIQUE INDEX `tbl_tipo_residencia_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_residencia_cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cliente` INTEGER NOT NULL,
    `id_endereco` INTEGER NOT NULL,
    `id_tipo_residencia` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_residencia_cliente_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_genero` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `tbl_genero_nome_key`(`nome`),
    UNIQUE INDEX `tbl_genero_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `cpf` VARCHAR(20) NOT NULL,
    `data_nascimento` DATE NOT NULL,
    `biografia` TEXT NULL,
    `foto_perfil` TEXT NULL,
    `email` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(30) NOT NULL,
    `id_genero` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_cliente_cpf_key`(`cpf`),
    UNIQUE INDEX `tbl_cliente_email_key`(`email`),
    UNIQUE INDEX `tbl_cliente_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_telefone_cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero_telefone` VARCHAR(15) NOT NULL,
    `ddd` VARCHAR(2) NOT NULL,
    `id_cliente` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_telefone_cliente_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_diarista` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `cpf` VARCHAR(20) NOT NULL,
    `data_nascimento` DATE NOT NULL,
    `biografia` TEXT NULL,
    `foto_perfil` TEXT NULL,
    `email` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(30) NOT NULL,
    `media_valor` VARCHAR(45) NOT NULL,
    `id_endereco` INTEGER NOT NULL,
    `id_genero` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_diarista_cpf_key`(`cpf`),
    UNIQUE INDEX `tbl_diarista_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_telefone_diarista` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero_telefone` VARCHAR(15) NOT NULL,
    `ddd` VARCHAR(2) NOT NULL,
    `id_diarista` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_telefone_diarista_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_status_conta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` BOOLEAN NOT NULL,

    UNIQUE INDEX `tbl_status_conta_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_status_conta_diarista` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_status` DATE NOT NULL,
    `id_diarista` INTEGER NOT NULL,
    `id_status_conta` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_status_conta_diarista_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_status_conta_cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_status` DATE NOT NULL,
    `id_cliente` INTEGER NOT NULL,
    `id_status_conta` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_status_conta_cliente_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_cidade` ADD CONSTRAINT `tbl_cidade_id_estado_fkey` FOREIGN KEY (`id_estado`) REFERENCES `tbl_estado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_endereco` ADD CONSTRAINT `tbl_endereco_id_cidade_fkey` FOREIGN KEY (`id_cidade`) REFERENCES `tbl_cidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_residencia_cliente` ADD CONSTRAINT `tbl_residencia_cliente_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `tbl_cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_residencia_cliente` ADD CONSTRAINT `tbl_residencia_cliente_id_endereco_fkey` FOREIGN KEY (`id_endereco`) REFERENCES `tbl_endereco`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_residencia_cliente` ADD CONSTRAINT `tbl_residencia_cliente_id_tipo_residencia_fkey` FOREIGN KEY (`id_tipo_residencia`) REFERENCES `tbl_tipo_residencia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_cliente` ADD CONSTRAINT `tbl_cliente_id_genero_fkey` FOREIGN KEY (`id_genero`) REFERENCES `tbl_genero`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_telefone_cliente` ADD CONSTRAINT `tbl_telefone_cliente_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `tbl_cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_diarista` ADD CONSTRAINT `tbl_diarista_id_endereco_fkey` FOREIGN KEY (`id_endereco`) REFERENCES `tbl_endereco`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_diarista` ADD CONSTRAINT `tbl_diarista_id_genero_fkey` FOREIGN KEY (`id_genero`) REFERENCES `tbl_genero`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_telefone_diarista` ADD CONSTRAINT `tbl_telefone_diarista_id_diarista_fkey` FOREIGN KEY (`id_diarista`) REFERENCES `tbl_diarista`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_status_conta_diarista` ADD CONSTRAINT `tbl_status_conta_diarista_id_diarista_fkey` FOREIGN KEY (`id_diarista`) REFERENCES `tbl_diarista`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_status_conta_diarista` ADD CONSTRAINT `tbl_status_conta_diarista_id_status_conta_fkey` FOREIGN KEY (`id_status_conta`) REFERENCES `tbl_status_conta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_status_conta_cliente` ADD CONSTRAINT `tbl_status_conta_cliente_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `tbl_cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_status_conta_cliente` ADD CONSTRAINT `tbl_status_conta_cliente_id_status_conta_fkey` FOREIGN KEY (`id_status_conta`) REFERENCES `tbl_status_conta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
