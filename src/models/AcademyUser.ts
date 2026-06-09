// src/models/AcademyUser.ts
// 驚喜學院學員資料

export interface AcademyUser {
  _id?: string;
  email:            string;   // 唯一識別
  nickname:         string;   // 暱稱
  points:           number;   // 累積積分
  completedLessons: string[]; // ['stock-lesson-1', 'stock-lesson-3', ...]
  completedAcademies: string[]; // ['stock']
  magicToken?:       string;
  magicTokenExpiry?: Date;
  createdAt:        Date;
  lastLoginAt?:     Date;
}
