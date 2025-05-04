/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
//npx swagger-typescript-api generate --path https://book-be-5lb9.onrender.com/api-docs -o ./types/dto.ts --no-client
//swagger-typescript-api로 생성됨
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface PublisherCreateRequest {
  name: string;
  engName?: string;
  logo?: string;
  description?: string;
  memo?: string;
  /** @default [] */
  urls?: UrlInfo[];
  /** @default [] */
  bookIsbnList?: string[];
  /** @default [] */
  tagList?: string[];
}

/** @default [] */
export interface UrlInfo {
  url: string;
  type: string;
}

export interface BookDto {
  isbn: string;
  title: string;
  summary: string;
  /** @format date-time */
  publishedDate: string;
  titleImage?: string;
  authorList: Simple[];
  translator?: string;
  /** @format int32 */
  price?: number;
  publisher: Simple;
}

export interface Detail {
  /** @format int64 */
  id: number;
  name: string;
  engName?: string;
  logo?: string;
  isOfficial: boolean;
  description?: string;
  urls: UrlInfo[];
  books: BookDto[];
  tags: TagDto[];
}

export interface Simple {
  /** @format int64 */
  id: number;
  name: string;
}

export interface TagDto {
  name: string;
}

export interface EventCreateRequest {
  title: string;
  urls: UrlInfo[];
  host: string;
  /** @format int64 */
  userId: number;
  location: "ONLINE" | "OFFLINE";
  /** @format date */
  startDate: string;
  /** @format date */
  endDate: string;
  eventType: string;
  eventFlag: "SOLO" | "GROUP" | "ETC";
  isPosting: boolean;
  bookTitle?: string;
  senderName?: string;
  senderEmail?: string;
  senderMessage?: string;
  memo?: string;
  /** @default [] */
  tagList?: string[];
  /** @default [] */
  bookIsbnList?: string[];
}

export interface EventDto {
  /** @format int64 */
  id: number;
  title: string;
  host: string;
  creator: UserDto;
  urls: UrlInfo[];
  bookTitle?: string;
  senderName?: string;
  senderEmail?: string;
  senderMessage?: string;
  location: "ONLINE" | "OFFLINE";
  /** @format date */
  startDate: string;
  /** @format date */
  endDate: string;
  eventType: string;
  eventFlag: "SOLO" | "GROUP" | "ETC";
  memo?: string;
  books: BookDto[];
  tags: TagDto[];
}

export interface UserDto {
  /** @format int64 */
  id: number;
  name: string;
}

export interface ContentsCreateRequest {
  type: "VIDEO" | "ARTICLE" | "PODCAST" | "LINK" | "SNS";
  /** @format int64 */
  creatorId: number;
  title?: string;
  image?: string;
  description?: string;
  memo?: string;
  /** @default [] */
  urls?: UrlInfo[];
  /** @default [] */
  tagList?: string[];
  /** @default [] */
  bookIsbnList?: string[];
}

export interface ContentsDto {
  /** @format int64 */
  id: number;
  title?: string;
  type: "VIDEO" | "ARTICLE" | "PODCAST" | "LINK" | "SNS";
  urls: UrlInfo[];
  image?: string;
  creator: UserDto;
}

export interface ContactCreateRequest {
  name?: string;
  email: string;
  message: string;
}

export interface ContactDto {
  name?: string;
  email: string;
  message: string;
}

export interface BookCreateRequest {
  isbn: string;
  title: string;
  summary: string;
  /** @format date-time */
  publishedDate: string;
  detailUrl?: string;
  translator?: string;
  /** @format int32 */
  price?: number;
  titleImage?: string;
  /** @default [] */
  authorIdList?: number[];
  /** @default [] */
  authorNameList?: string[];
  /** @format int64 */
  publisherId?: number;
  publisherName?: string;
}

export interface AuthorCreateRequest {
  name: string;
  description?: string;
  profile?: string;
  /** @default [] */
  bookIsdnList?: string[];
}

export interface AuthorDto {
  /** @format int64 */
  id: number;
  name: string;
  description?: string;
  profile?: string;
  bookList: BookDto[];
}

export interface PageResponsePublisherDto {
  items: PublisherDto[];
  /** @format int64 */
  totalCount: number;
  /** @format int32 */
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface PublisherDto {
  /** @format int64 */
  id: number;
  name: string;
  engName?: string;
  logo?: string;
  isOfficial: boolean;
  description?: string;
  urls: UrlInfo[];
}

export interface PageResponseEventDto {
  items: EventDto[];
  /** @format int64 */
  totalCount: number;
  /** @format int32 */
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ListResponseBookDto {
  items: BookDto[];
  /** @format int32 */
  length: number;
}

export interface PageResponseContentsDto {
  items: ContentsDto[];
  /** @format int64 */
  totalCount: number;
  /** @format int32 */
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ListResponseContentsDto {
  items: ContentsDto[];
  /** @format int32 */
  length: number;
}

export interface ListResponseContactDto {
  items: ContactDto[];
  /** @format int32 */
  length: number;
}

export interface PageResponseBookDto {
  items: BookDto[];
  /** @format int64 */
  totalCount: number;
  /** @format int32 */
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ListResponseEventDto {
  items: EventDto[];
  /** @format int32 */
  length: number;
}

export interface ListResponseRecommendedBookDto {
  items: RecommendedBookDto[];
  /** @format int32 */
  length: number;
}

export interface RecommendedBookDto {
  isbn: string;
  title: string;
  summary: string;
  /** @format date-time */
  publishedDate: string;
  titleImage?: string;
  authorList: AuthorDto[];
  translator?: string;
  /** @format int32 */
  price?: number;
  publisher: PublisherDto;
  /** @format date */
  recommendedDate: string;
}

export interface PageResponseAuthorDto {
  items: AuthorDto[];
  /** @format int64 */
  totalCount: number;
  /** @format int32 */
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
