How to Clone and Set Up the Project

1️⃣ Clone the Repository
Open a terminal and run:
git clone <your-repository-url>
cd grocery-shop-server

2️⃣ Install Dependencies
npm install

3️⃣ Set Up Environment Variables
Create a .env file and configure the necessary variables.

4️⃣ Build the Project
npm run build

5️⃣ Run the Project in Development Mode
npm run start:dev

Now, this project should be running successfully! 🚀








// Admin
export type TAdmin = {
  _id?: Types.ObjectId;
  email: string;
  name: string;
  profilePhoto?: string;
  contactNumber?: string;
  address?: string;
  bio?: string;
  isActive?: boolean;
  isVerified?: boolean;
  socialLinks?: Record<string, any>;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  user: Types.ObjectId;
};

// Author
export type TAuthor = {
  _id?: Types.ObjectId;
  email: string;
  name: string;
  profilePhoto: string;
  contactNumber: string;
  address?: string;
  bio?: string;
  socialLinks?: Record<string, any>;
  isVerified?: boolean;
  totalPosts?: number;
  totalReacts?: number;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  user: Types.ObjectId;
};

// Editor
export type TEditor = {
  _id?: Types.ObjectId;
  email: string;
  name: string;
  profilePhoto: string;
  contactNumber: string;
  address?: string;
  bio?: string;
  role?: EditorRole;
  isActive?: boolean;
  isVerified?: boolean;
  socialLinks?: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
  user: Types.ObjectId;
};

// Post
export type TPost = {
  _id?: Types.ObjectId;
  title: string;
  slug: string;
  summary?: string;
  content: string;
  coverImage?: string;
  author: Types.ObjectId;
  category: Types.ObjectId;
  tags?: Types.ObjectId[];
  isPublished?: boolean;
  publishedAt?: Date;
  status?: PostStatus;
  reactions?: Types.ObjectId[];
  comments?: Types.ObjectId[];
  viewsCount?: number;
  views?: Types.ObjectId[];
  readingTime?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

// Opinion
export type TOpinion = {
  _id?: Types.ObjectId;
  title: string;
  slug: string;
  content: string;
  author: Types.ObjectId;
  category: Types.ObjectId;
  tags?: Types.ObjectId[];
  isPublished?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

// VideoNews
export type TVideoNews = {
  _id?: Types.ObjectId;
  title: string;
  slug: string;
  content: string;
  videoUrl?: string;
  isVideoNews?: boolean;
  author: Types.ObjectId;
  category: Types.ObjectId;
  tags?: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
};

// Category
export type TCategory = {
  _id?: Types.ObjectId;
  name: SetNewsType;
  slug: string;
};

// Tag
export type TTag = {
  _id?: Types.ObjectId;
  name: string;
  posts?: Types.ObjectId[];
  opinions?: Types.ObjectId[];
  videoNews?: Types.ObjectId[];
};

// Reaction
export type TReaction = {
  _id?: Types.ObjectId;
  type: ReactionType;
  user: Types.ObjectId;
  post: Types.ObjectId;
  createdAt?: Date;
};

// Comment
export type TComment = {
  _id?: Types.ObjectId;
  post: Types.ObjectId;
  user: Types.ObjectId;
  userImage: string;
  content: string;
  createdAt?: Date;
};

// WebsiteReview
export type TWebsiteReview = {
  _id?: Types.ObjectId;
  content: string;
  rating: number;
  reviewer?: Types.ObjectId;
  isAnonymous?: boolean;
  isApproved?: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

// Subscriber
export type TSubscriber = {
  _id?: Types.ObjectId;
  email: string;
  createdAt?: Date;
};

// ContactMessage
export type TContactMessage = {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

// PostView
export type TPostView = {
  _id?: Types.ObjectId;
  post: Types.ObjectId;
  user?: Types.ObjectId;
  ipAddress?: string;
  userAgent?: string;
  viewedAt?: Date;
  readingTime?: number;
};

// PostReading
export type TPostReading = {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  post: Types.ObjectId;
  duration: number;
  readAt?: Date;
};

// Notification
export type TNotification = {
  _id?: Types.ObjectId;
  title: string;
  isDeleted?: boolean;
  createdAt?: Date;
};
