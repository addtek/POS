-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 28, 2019 at 01:22 AM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pos_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `item_category`
--

CREATE TABLE `item_category` (
  `id` int(10) UNSIGNED NOT NULL,
  `categoryID` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoryDescription` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `item_category`
--

INSERT INTO `item_category` (`id`, `categoryID`, `categoryDescription`, `created_at`, `updated_at`) VALUES
(1, 'PENDRIVES', 'storage device', '2019-03-01 05:00:00', '2019-03-01 05:00:00'),
(2, 'MEMORY CARD', 'Storage Device', '2019-03-01 05:00:00', '2019-03-01 05:00:00'),
(3, 'EXTERNAL CASE', 'for storage Device', '2019-03-01 05:00:00', '2019-03-01 05:00:00'),
(4, 'WIRELESS MOUSE', 'Pointing Device', '2019-03-01 05:00:00', '2019-03-01 05:00:00'),
(5, 'USB MOUSE', 'Pointing Device', '2019-03-01 05:00:00', '2019-03-01 05:00:00'),
(6, 'ANDROID CHARGERS', 'Power charging', '2019-03-01 05:00:00', '2019-03-01 05:00:00'),
(7, 'DATA CABLES', 'DATA CABLES\r\n', '2019-03-01 05:00:00', '2019-03-01 05:00:00'),
(8, 'WIRELESS KEYBOARD', 'WIRELESS KEYBOARD\r\n', '2019-03-01 05:00:00', '2019-03-01 05:00:00'),
(9, 'UNIVERSAL CHARGERS', 'UNIVERSAL CHARGERS\r\n', '2019-03-01 05:00:00', '2019-03-01 05:00:00'),
(10, 'BLUETOOTH HANDSFREEE', 'BLUETOOTH HANDSFREEE\r\n', '2019-03-01 05:00:00', '2019-03-01 05:00:00'),
(11, 'BLUETOOTH RADIO', 'BLUETOOTH RADIO', '2019-03-01 05:00:00', '2019-03-01 05:00:00'),
(12, 'BLUETOOTH HEADSET', 'BLUETOOTH HEADSET', '2019-03-01 05:00:00', '2019-03-01 05:00:00'),
(13, 'HEADPHONES', 'HEADPHONES', '2019-03-01 05:00:00', '2019-03-01 05:00:00'),
(14, 'EARPIECE', 'EARPIECE\r\n', '2019-03-01 05:00:00', '2019-03-01 05:00:00'),
(15, 'GAME PAD', 'GAME PAD\r\n', '2019-03-01 05:00:00', '2019-03-01 05:00:00'),
(16, 'EXTENSION BOARD', 'EXTENSION BOARD\r\n', '2019-03-01 05:00:00', '2019-03-01 05:00:00'),
(17, 'LAPTOP CHARGERS', 'LAPTOP CHARGERS\r\n', '2019-03-01 05:00:00', '2019-03-01 05:00:00'),
(18, 'VGA CABLE', 'VGA CABLE\r\n', '2019-03-01 05:00:00', '2019-03-01 05:00:00'),
(19, 'LAPTOP ADOPTOR', 'laptop adoptor\r\n', '2019-03-01 05:00:00', '2019-03-01 05:00:00'),
(20, 'MULTY SOCKET', 'multy socket\r\n', '2019-03-01 05:00:00', '2019-03-01 05:00:00'),
(21, 'ROPE', 'ROPE\r\n', '2019-03-01 05:00:00', '2019-03-01 05:00:00'),
(22, 'SCREEN PROTECTORS', 'SCREEN PROTECTORS\r\n', '2019-03-01 05:00:00', '2019-03-01 05:00:00'),
(23, 'IPHONE BLUETOOTH', 'IPHONE BLUETOOTH in case', '2019-03-02 05:00:00', '2019-03-02 05:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2019_03_01_091607_create_item_category_table', 1),
(3, '2019_03_01_091737_create_stock_table', 1),
(4, '2019_03_01_092740_create_sales_table', 1),
(5, '2019_03_01_092831_create_recent_activities_table', 1),
(6, '2019_03_01_092920_create_records_table', 1),
(7, '2019_03_01_101913_create_notifications_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(10) UNSIGNED NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `note` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sendTo` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `seen` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `recent_activities`
--

CREATE TABLE `recent_activities` (
  `id` int(10) UNSIGNED NOT NULL,
  `activityType` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activity` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `performedBy` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `records`
--

CREATE TABLE `records` (
  `id` int(10) UNSIGNED NOT NULL,
  `reportingMonth` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fromDate` date NOT NULL,
  `toDate` date NOT NULL,
  `totalSales` double(8,2) NOT NULL,
  `stockTotalThen` double NOT NULL,
  `stockTotalNow` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_name` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`, `created_at`, `updated_at`) VALUES
('MAN', 'Manager', '2019-01-22 19:48:26', '2019-03-03 21:41:55'),
('MS', 'Mobile Seller', '2019-01-22 19:27:50', '2019-03-03 21:38:33'),
('SA', 'System Admin', '2019-01-22 19:29:16', '2019-03-03 21:40:48'),
('SM', 'Sales Manager', '2019-01-22 19:29:49', '2019-03-03 21:38:10'),
('Tech', 'Technician', '2019-01-22 19:29:30', '2019-03-03 21:42:37');

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `id` int(10) UNSIGNED NOT NULL,
  `itemName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` double(5,2) NOT NULL,
  `remarks` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `addedBy` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

CREATE TABLE `stock` (
  `id` int(10) UNSIGNED NOT NULL,
  `category` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `itemName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `numberInStock` int(11) NOT NULL,
  `pricePerItem` double(5,2) NOT NULL,
  `minQty` int(1) NOT NULL DEFAULT '1',
  `addedBy` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`id`, `category`, `itemName`, `numberInStock`, `pricePerItem`, `minQty`, `addedBy`, `created_at`, `updated_at`) VALUES
(2, 'PENDRIVES', 'PENDRIVES 8gb', 19, 25.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-09 21:12:26'),
(3, 'PENDRIVES', 'PENDRIVES 16gb', 8, 30.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-04-27 13:39:59'),
(4, 'PENDRIVES', 'PENDRIVES 32gb', 2, 50.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-06 23:42:19'),
(5, 'MEMORY CARD', 'MEMORY CARD 4GB', 1, 20.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-06 20:23:44'),
(6, 'MEMORY CARD', 'MEMORY CARD 8GB', 4, 25.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-09 18:54:01'),
(7, 'MEMORY CARD', 'MEMORY CARD 16GB', 6, 30.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-04 22:39:30'),
(8, 'MEMORY CARD', 'MEMORY CARD 32GB', 0, 40.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-06 22:52:06'),
(9, 'EXTERNAL CASE', 'EXTERNAL CASE 32GB', 2, 45.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-04 23:18:31'),
(10, 'WIRELESS MOUSE', 'WIRELESS MOUSE Flat ', 2, 25.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-04 23:32:50'),
(11, 'WIRELESS MOUSE', 'WIRELESS MOUSE In box', 10, 35.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-02 05:00:00'),
(12, 'USB MOUSE', 'USB MOUSE DELL', 2, 15.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-02 05:00:00'),
(13, 'USB MOUSE', 'USB MOUSE HP', 13, 15.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-11 19:02:18'),
(14, 'USB MOUSE', 'USB MOUSE ACER', 0, 15.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-02 05:00:00'),
(15, 'USB MOUSE', 'USB MOUSE LOGITEC', 0, 15.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-02 05:00:00'),
(16, 'ANDROID CHARGERS', 'ANDROID CHARGERS Normal', 20, 8.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-11 17:00:47'),
(17, 'ANDROID CHARGERS', 'ANDROID CHARGERS infinix', 3, 15.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-04-27 13:40:06'),
(18, 'ANDROID CHARGERS', 'ANDROID CHARGERS infinix fast charging', 20, 25.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-14 17:26:28'),
(19, 'ANDROID CHARGERS', 'ANDROID CHARGERS samsung', 2, 20.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-14 17:25:31'),
(20, 'ANDROID CHARGERS', 'ANDROID CHARGERS fast charging', 10, 25.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-04-27 15:04:06'),
(21, 'ANDROID CHARGERS', 'ANDROID CHARGERS arimo', 11, 25.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-04-27 13:38:51'),
(22, 'ANDROID CHARGERS', 'ANDROID CHARGERS Iphone 4', 5, 25.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-14 17:25:29'),
(23, 'ANDROID CHARGERS', 'ANDROID CHARGERS Iphone 7', 5, 25.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-09 21:12:32'),
(24, 'ANDROID CHARGERS', 'ANDROID CHARGERS TECHNO', 4, 20.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-02 05:00:00'),
(25, 'DATA CABLES', 'DATA CABLES TECHNO', 4, 10.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-02 05:00:00'),
(26, 'WIRELESS KEYBOARD', 'WIRELESS KEYBOARD not specified', 2, 80.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-09 19:08:09'),
(27, 'UNIVERSAL CHARGERS', 'UNIVERSAL CHARGERS not specified', 1, 8.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-02 05:00:00'),
(28, 'IPHONE BLUETOOTH', 'IPHONE BLUETOOTH in case', 2, 45.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-02 05:00:00'),
(29, 'BLUETOOTH HANDSFREEE', 'BLUETOOTH HANDSFREEE not specified', 3, 50.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-09 18:54:05'),
(30, 'BLUETOOTH RADIO', 'BLUETOOTH RADIO not specified', 1, 55.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-02 05:00:00'),
(31, 'BLUETOOTH HEADSET', 'BLUETOOTH HEADSET not specified', 2, 40.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-02 05:00:00'),
(32, 'HEADPHONES', 'HEADPHONES not specified', 0, 40.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-02 05:00:00'),
(33, 'EARPIECE', 'EARPIECE SAMSUNG (IPHONE)', 33, 10.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-11 16:59:43'),
(34, 'EARPIECE', 'EARPIECE philips', 3, 15.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-09 18:23:53'),
(35, 'EARPIECE', 'EARPIECE Iphone', 2, 15.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-11 16:59:41'),
(36, 'EARPIECE', 'EARPIECE e-Power', 4, 10.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-02 05:00:00'),
(37, 'GAME PAD', 'GAME PAD Single', 2, 25.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-02 05:00:00'),
(38, 'GAME PAD', 'GAME PAD Double', 0, 40.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-02 05:00:00'),
(39, 'EXTENSION BOARD', 'EXTENSION BOARD HOME USED', 5, 60.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-02 05:00:00'),
(40, 'EXTENSION BOARD', 'EXTENSION BOARD NORMAL', 3, 20.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-09 19:08:12'),
(41, 'LAPTOP CHARGERS', 'LAPTOP CHARGERS Toshiba', 1, 45.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-02 05:00:00'),
(42, 'LAPTOP CHARGERS', 'LAPTOP CHARGERS dell', 1, 45.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-02 05:00:00'),
(43, 'LAPTOP CHARGERS', 'LAPTOP CHARGERS hp', 3, 45.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-02 05:00:00'),
(44, 'LAPTOP CHARGERS', 'LAPTOP CHARGERS sony', 0, 45.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-02 05:00:00'),
(45, 'LAPTOP CHARGERS', 'LAPTOP CHARGERS acer', 0, 45.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-02 05:00:00'),
(46, 'VGA CABLE', 'VGA CABLE Not Specified', 10, 15.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-06 18:46:53'),
(47, 'LAPTOP ADOPTOR', 'laptop adoptor Not Specified', 2, 3.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-02 05:00:00'),
(48, 'MULTY SOCKET', 'multy socket Not Specified', 1, 5.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-02 05:00:00'),
(49, 'ROPE', 'ROPE Not Specified', 16, 2.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-09 18:14:14'),
(50, 'SCREEN PROTECTORS', 'SCREEN PROTECTORS INFINIX', 0, 10.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-02 05:00:00'),
(51, 'SCREEN PROTECTORS', 'SCREEN PROTECTORS HUAWEI', 0, 10.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-02 05:00:00'),
(52, 'SCREEN PROTECTORS', 'SCREEN PROTECTORS SAMSUNG', 0, 10.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-02 05:00:00'),
(53, 'SCREEN PROTECTORS', 'SCREEN PROTECTORS ITEL', 0, 10.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-02 05:00:00'),
(54, 'SCREEN PROTECTORS', 'SCREEN PROTECTORS IPHONE', 0, 10.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-02 05:00:00'),
(55, 'SCREEN PROTECTORS', 'SCREEN PROTECTORS NOKIA', 2, 10.00, 1, 'mcaddey', '2019-03-02 05:00:00', '2019-03-05 20:12:18'),
(58, 'PENDRIVES', 'PENDRIVES 4gb', 2, 22.00, 1, 'sagemoy', '2019-03-06 21:31:25', '2019-03-06 23:59:55'),
(59, 'EXTERNAL CASE', 'EXTERNAL CASE Transcensd', 5, 45.00, 1, 'sagemoy', '2019-03-09 18:29:47', '2019-03-09 18:29:47');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `sn` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `on` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `un` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phoneNum` varchar(13) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userRole` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `sn`, `on`, `un`, `email`, `phoneNum`, `password`, `userRole`, `token`, `active`, `created_at`, `updated_at`) VALUES
(1, 'SomeAdmin', 'Admin', 'admin1', 'admin1@gmail.com', '+233544XXXXXX', '$2y$10$QhtFwtvQQT2cSVpRqn9ik.mTV4hBlyDA3lJkwteRcoHvr3XB3IKtC', 'SA', '', 1, '2019-03-02 05:00:00', '2019-04-27 15:02:55'),
(5, 'Obi', 'Account', 'obiAcc', 'obi@gmail.com', '+23324XXXXXXX', '$2y$10$UNOXRRilg11zqM0i.6QJlu/B1rCiIjQig0zkH6ihtzsDxO7TS8W5S', 'MAN', 'RDNxZ3JTOFhZOWtueDhKMGd3dmJHb2lZV2syWWM3aHpya3ROSXM3eg==', 1, '2019-03-04 05:25:35', '2019-04-27 15:02:58'),
(6, 'Owusu', 'Limit reached', 'yooyoo', 'nolimit@gmail.com', '+233244XXXXXX', '$2y$10$W3yKnO1S1xZrnklfeWhoueVpv4Tl1MSxaVGJBItiXbmIuYP7HiyFu', 'MS', 'bExxcDhLUnNmc3dSQ21PczdyUWcxWjFGS0ZGOWRiZTlvZWcybUZYeg==', 1, '2019-03-04 05:32:46', '2019-03-21 20:54:23'),
(7, 'Some Name', 'Other names', 'salesboy', 'salesboy@smv.com', '+23320XXXXXXX', '$2y$10$D.Q13B1CEbfz6Ev6jMih1ODE86jZufC4XqKE/OeeFg4hNqy3flFvG', 'SM', NULL, 1, '2019-03-08 16:42:56', '2019-04-27 15:02:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `item_category`
--
ALTER TABLE `item_category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `item_category_categoryid_unique` (`categoryID`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_sendto_foreign` (`sendTo`);

--
-- Indexes for table `recent_activities`
--
ALTER TABLE `recent_activities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recent_activities_performedby_foreign` (`performedBy`);

--
-- Indexes for table `records`
--
ALTER TABLE `records`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`),
  ADD UNIQUE KEY `role_name` (`role_name`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sales_itemname_foreign` (`itemName`),
  ADD KEY `sales_addedby_foreign` (`addedBy`);

--
-- Indexes for table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `stock_itemname_unique` (`itemName`),
  ADD KEY `stock_addedby_foreign` (`addedBy`),
  ADD KEY `stock_category_foreign` (`category`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_un_unique` (`un`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_phonenum_unique` (`phoneNum`),
  ADD KEY `foreign_key_role` (`userRole`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `item_category`
--
ALTER TABLE `item_category`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `recent_activities`
--
ALTER TABLE `recent_activities`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `records`
--
ALTER TABLE `records`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `stock`
--
ALTER TABLE `stock`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_sendto_foreign` FOREIGN KEY (`sendTo`) REFERENCES `users` (`un`) ON UPDATE CASCADE;

--
-- Constraints for table `recent_activities`
--
ALTER TABLE `recent_activities`
  ADD CONSTRAINT `recent_activities_performedby_foreign` FOREIGN KEY (`performedBy`) REFERENCES `users` (`un`);

--
-- Constraints for table `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_addedby_foreign` FOREIGN KEY (`addedBy`) REFERENCES `users` (`un`) ON UPDATE CASCADE,
  ADD CONSTRAINT `sales_itemname_foreign` FOREIGN KEY (`itemName`) REFERENCES `stock` (`itemName`) ON UPDATE CASCADE;

--
-- Constraints for table `stock`
--
ALTER TABLE `stock`
  ADD CONSTRAINT `stock_addedby_foreign` FOREIGN KEY (`addedBy`) REFERENCES `users` (`un`) ON UPDATE CASCADE,
  ADD CONSTRAINT `stock_category_foreign` FOREIGN KEY (`category`) REFERENCES `item_category` (`categoryID`) ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `foreign_key_role` FOREIGN KEY (`userRole`) REFERENCES `roles` (`role_id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
