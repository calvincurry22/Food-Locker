USE [master]
GO

IF db_id('FoodLocker') IS NULL
  CREATE DATABASE FoodLocker
GO

USE [FoodLocker]
GO


DROP TABLE IF EXISTS [User];
DROP TABLE IF EXISTS [Audit];
DROP TABLE IF EXISTS [AuditViolation];
DROP TABLE IF EXISTS [ViolationCategory];
DROP TABLE IF EXISTS [Task];
DROP TABLE IF EXISTS [Employee];
DROP TABLE IF EXISTS [Credential];
GO 

CREATE TABLE [User] (
  [Id] int IDENTITY(1,1) PRIMARY KEY NOT NULL,
  [FirstName] varchar(20) NOT NULL,
  [LastName] varchar(20) NOT NULL,
  [Email] varchar(50) NOT NULL,
  [Password] varchar(50) NOT NULL,
  [BusinessName] varchar(100) NOT NULL,
  [FirebaseUserId] varchar(50) NOT NULL,
  [Image] varchar(200) NULL,

  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
)
GO

CREATE TABLE [Audit] (
  [Id] int IDENTITY(1,1) PRIMARY KEY NOT NULL,
  [UserId] int NOT NULL,
  [Score] int NOT NULL,
  [Passed] BIT NOT NULL,
  [AuditorName] varchar(50),
  [AuditDate] datetime NOT NULL
)
GO

CREATE TABLE [AuditViolation] (
  [Id] int IDENTITY(1,1) PRIMARY KEY NOT NULL,
  [AuditId] int NOT NULL,
  [IsCritical] BIT NOT NULL,
  [ViolationCategoryId] int NOT NULL,
  [Description] varchar(500) NOT NULL
)
GO

CREATE TABLE [ViolationCategory] (
  [Id] int IDENTITY(1,1) PRIMARY KEY NOT NULL,
  [Name] varchar(50)
)
GO

CREATE TABLE [Task] (
  [Id] int IDENTITY(1,1) PRIMARY KEY NOT NULL,
  [UserId] int NOT NULL,
  [Text] varchar(100) NOT NULL,
  [CreationDate] datetime NOT NULL,
  [ExpirationDate] datetime NULL,
  [EmployeeId] int NULL,
  [IsCompleted] BIT NOT NULL
)
GO

CREATE TABLE [Employee] (
  [Id] int IDENTITY(1,1) PRIMARY KEY NOT NULL,
  [FirstName] varchar(20) NOT NULL,
  [LastName] varchar(20) NOT NULL,
  [HireDate] datetime NOT NULL,
  [Title] varchar(30) NOT NULL,
  [UserId] int NOT NULL
)
GO

CREATE TABLE [Credential] (
  [Id] int IDENTITY(1,1) PRIMARY KEY NOT NULL,
  [EmployeeId] int NOT NULL,
  [Name] varchar(70) NOT NULL,
  [ExpirationDate] datetime NOT NULL,
  [IssueDate] datetime NOT NULL,
  [RenewalFee] decimal
)
GO

ALTER TABLE [Audit] ADD CONSTRAINT FK_Audit_User FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO


ALTER TABLE [AuditViolation] ADD CONSTRAINT FK_AuditViolation_ViolationCategory FOREIGN KEY ([ViolationCategoryId]) REFERENCES [ViolationCategory] ([Id])
GO

ALTER TABLE [Task] ADD  CONSTRAINT FK_Task_User FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Task] ADD CONSTRAINT FK_Task_Employee FOREIGN KEY ([EmployeeId]) REFERENCES [Employee] ([Id])
GO

ALTER TABLE [Credential] ADD CONSTRAINT FK_Credential_Employee FOREIGN KEY ([EmployeeId]) REFERENCES [Employee] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Employee] ADD CONSTRAINT FK_Employee_User FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [AuditViolation] ADD FOREIGN KEY ([AuditId]) REFERENCES [Audit] ([Id]) ON DELETE CASCADE 
GO
