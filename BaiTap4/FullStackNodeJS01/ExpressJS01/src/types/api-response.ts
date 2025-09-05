// src/types/api-response.ts

/**
 * Kiểu phản hồi chung cho tất cả API
 */
export interface ApiResponse<T = unknown> {
  success: boolean;           // true nếu OK, false nếu lỗi
  message: string;            // mô tả ngắn gọn cho user
  data?: T;                   // dữ liệu trả về
  errorCode?: string;         // mã lỗi kỹ thuật (nếu có)
  path?: string;              // route được gọi
  timestamp?: string;         // thời điểm phản hồi (ISO)
  durationMs?: number;        // thời gian xử lý (ms)
}

/**
 * Dữ liệu phân trang
 */
export interface PaginatedResponse<T = unknown> {
  items: T[];                // danh sách phần tử
  totalItems: number;        // tổng số phần tử
  totalPages: number;        // tổng số trang
  currentPage: number;       // trang hiện tại
  perPage: number;           // số phần tử mỗi trang
  hasNextPage: boolean;      // còn trang sau?
  hasPrevPage: boolean;      // còn trang trước?
}
