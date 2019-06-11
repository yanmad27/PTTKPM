/*
 Navicat Premium Data Transfer

 Source Server         : mamp
 Source Server Type    : MySQL
 Source Server Version : 50724
 Source Host           : localhost:8889
 Source Schema         : eroomdb

 Target Server Type    : MySQL
 Target Server Version : 50724
 File Encoding         : 65001

 Date: 09/06/2019 23:02:46
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for khachhang
-- ----------------------------
DROP TABLE IF EXISTS `khachhang`;
CREATE TABLE `khachhang`  (
  `idKHACHHANG` int(11) NOT NULL AUTO_INCREMENT,
  `TenKH` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `SDT` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `DiaChi` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `TenDangNhap` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `MatKhau` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Quyen` int(2) NOT NULL DEFAULT 0,
  PRIMARY KEY (`idKHACHHANG`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of khachhang
-- ----------------------------
INSERT INTO `khachhang` VALUES (2, 'Nguyễn Dũng', 'quocdung1612@gmail.com', '965577030', '336/1 Phạm Hữu Lầu', 'admin', '$2b$10$doAzh1j49AECttDyxMRy3.cjJNLCtdBe30NZXK4/SAoA5V7JvGkOC', 1);
INSERT INTO `khachhang` VALUES (3, 'Khắc Doãn', 'yanmad@gmail.com', '0147852369', '10 Thành Thái', 'yanmad', '$2b$10$2F7PSl6s7B/w3s0T0wsOlOrJbSqZ2d2QTwYipaU4UqINYfNcxH2G6', 0);

-- ----------------------------
-- Table structure for khuvuc
-- ----------------------------
DROP TABLE IF EXISTS `khuvuc`;
CREATE TABLE `khuvuc`  (
  `idKhuVuc` int(11) NOT NULL AUTO_INCREMENT,
  `TenKhuVuc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`idKhuVuc`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of khuvuc
-- ----------------------------
INSERT INTO `khuvuc` VALUES (1, 'Quận 1');
INSERT INTO `khuvuc` VALUES (2, 'Quận 2');
INSERT INTO `khuvuc` VALUES (3, 'Quận 3');
INSERT INTO `khuvuc` VALUES (4, 'Quận 4');
INSERT INTO `khuvuc` VALUES (5, 'Quận Thủ Đức\r\n');
INSERT INTO `khuvuc` VALUES (6, 'Quận Gò Vấp\r\n');
INSERT INTO `khuvuc` VALUES (7, 'Quận Bình Thạnh\r\n');
INSERT INTO `khuvuc` VALUES (8, 'Quận Tân Bình\r\n');

-- ----------------------------
-- Table structure for nguoigiaodich
-- ----------------------------
DROP TABLE IF EXISTS `nguoigiaodich`;
CREATE TABLE `nguoigiaodich`  (
  `idNGUOIGD` int(11) NOT NULL AUTO_INCREMENT,
  `TenNguoiGD` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `DiaChi` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `SDT` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `GhiChu` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `Email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `idPhong` int(11) NOT NULL,
  `idKHACHHANG` int(11) NOT NULL,
  PRIMARY KEY (`idNGUOIGD`) USING BTREE,
  INDEX `nguoigd_ibfk_1`(`idPhong`) USING BTREE,
  INDEX `nguoigd_ibfk_2`(`idKHACHHANG`) USING BTREE,
  CONSTRAINT `nguoigd_ibfk_1` FOREIGN KEY (`idPhong`) REFERENCES `phong` (`idPhong`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `nguoigd_ibfk_2` FOREIGN KEY (`idKHACHHANG`) REFERENCES `khachhang` (`idKHACHHANG`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of nguoigiaodich
-- ----------------------------
INSERT INTO `nguoigiaodich` VALUES (5, 'Dũng', '336/1 Phạm Hữu Lầu', '965577030', 'Giao dịch ở ĐHKHTN', 'quocdung1612@gmail.com', 15, 3);

-- ----------------------------
-- Table structure for phong
-- ----------------------------
DROP TABLE IF EXISTS `phong`;
CREATE TABLE `phong`  (
  `idPhong` int(11) NOT NULL AUTO_INCREMENT,
  `TenPhong` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `DiaChi` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `HinhAnh` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `MoTa` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `GiaBan` double NOT NULL,
  `idKhuVuc` int(11) NOT NULL,
  PRIMARY KEY (`idPhong`) USING BTREE,
  INDEX `phong_ibfk_1`(`idKhuVuc`) USING BTREE,
  FULLTEXT INDEX `TenPhong`(`TenPhong`, `DiaChi`),
  CONSTRAINT `phong_ibfk_1` FOREIGN KEY (`idKhuVuc`) REFERENCES `khuvuc` (`idKhuVuc`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of phong
-- ----------------------------
INSERT INTO `phong` VALUES (1, 'STRIPED BRACES DETAILS', '1 Phạm Ngũ Lão', '/images/home/M1.jpg', 'Elastic braces with a contrast central stripe.', 10000000, 1);
INSERT INTO `phong` VALUES (2, 'OXFORD SHIRT', '2 Phạm Hữu Lầu', '/images/home/M2.jpg', 'Slim fit shirt with a button-down collar, long sleeves.', 8000000, 2);
INSERT INTO `phong` VALUES (3, 'TRAVELLER BERMUDA', '3 Phạm Ngũ Lão', '/images/home/M3.jpg', 'Stretch fabric with greater recovery.', 9000000, 3);
INSERT INTO `phong` VALUES (4, 'BASIC PIQUE POLO', '4 Mai Chí Thọ', '/images/home/M4.jpg', 'Collared polo shirt with short sleeves and ribbed trims.', 8500000, 4);
INSERT INTO `phong` VALUES (5, 'HIGH NECK SWEATER D', '5 Quang Trung', '/images/home/M5.jpg', 'Fine knit sweater with a high neck, long sleeves and ribbed trims.', 7500000, 5);
INSERT INTO `phong` VALUES (6, 'OPEN KNIT SWEATER', '6 Trương Định', '/images/home/M6.jpg', 'Open textured knit sweater with a round neckline.', 7000000, 6);
INSERT INTO `phong` VALUES (7, 'BUTTONED BLAZER', '7 Trần Hưng Đạo', '/images/home/WM1.jpg', 'NAVY BLUE', 11000000, 7);
INSERT INTO `phong` VALUES (8, 'BLAZER WITH BELT', '8 CMT8', '/images/home/WM2.jpg', 'Blazer made of a linen blend.', 9500000, 8);
INSERT INTO `phong` VALUES (9, 'STRAPPY DRESS', '9 Nguyễn Tri Phương', '/images/home/WM3.jpg', 'Dress featuring a cowl neckline and adjustable thin straps.', 6000000, 1);
INSERT INTO `phong` VALUES (10, 'ORGANZA MINI', '10 Lê Quý Đôn', '/images/home/WM4.jpg', 'Sleeveless dress with a high collar, low-cut back and interior lining.', 6500000, 2);
INSERT INTO `phong` VALUES (11, 'BASIC ASYMMETRICAL ', '11 Điện Biên Phủ', '/images/home/WM5.jpg', 'Short sleeve T-shirt with a round neckline and an asymmetric hem.', 5500000, 3);
INSERT INTO `phong` VALUES (12, 'ASYMMETRICAL ', '12 Nguyễn Văn Cừ', '/images/home/WM6.jpg', 'Short sleeve T-shirt with a round neckline and an asymmetric hem.', 8000000, 4);
INSERT INTO `phong` VALUES (13, 'STRIPED SLUB KNIT', '13 Lê Lợi', '/images/home/K1.jpg', 'Round neck T-shirt with short sleeves and striped print.', 9000000, 5);
INSERT INTO `phong` VALUES (14, 'RIBBED HALTER TOP', '14 Lý Thái Tổ', '/images/home/K2.jpg', 'Halter top with a ribbed finish.', 7000000, 6);
INSERT INTO `phong` VALUES (15, 'STRIPED BERMUDA ', '15 Thành Thái', '/images/home/1560088819987.jpg', 'Bermuda shorts with an elastic drawstring waistband.', 8000000, 7);

SET FOREIGN_KEY_CHECKS = 1;
