import {
  CollectionTypeSchema,
  StringAttribute,
  RequiredAttribute,
  SetMinMaxLength,
  JSONAttribute,
  DefaultTo,
  RelationAttribute,
  DateTimeAttribute,
  PrivateAttribute,
  EmailAttribute,
  UniqueAttribute,
  PasswordAttribute,
  BooleanAttribute,
  EnumerationAttribute,
  IntegerAttribute,
  DecimalAttribute,
  SetMinMax,
  TextAttribute,
  RichTextAttribute,
  MediaAttribute,
  UIDAttribute,
  DynamicZoneAttribute,
  SingleTypeSchema,
  ComponentAttribute,
  ComponentSchema,
} from "@strapi/strapi";

export interface AdminPermission extends CollectionTypeSchema {
  info: {
    name: "Permission";
    description: "";
    singularName: "permission";
    pluralName: "permissions";
    displayName: "Permission";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    subject: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: JSONAttribute & DefaultTo<{}>;
    conditions: JSONAttribute & DefaultTo<[]>;
    role: RelationAttribute<"admin::permission", "manyToOne", "admin::role">;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "admin::permission",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "admin::permission",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface AdminUser extends CollectionTypeSchema {
  info: {
    name: "User";
    description: "";
    singularName: "user";
    pluralName: "users";
    displayName: "User";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    firstname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    username: StringAttribute;
    email: EmailAttribute &
      RequiredAttribute &
      PrivateAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    registrationToken: StringAttribute & PrivateAttribute;
    isActive: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    roles: RelationAttribute<"admin::user", "manyToMany", "admin::role"> &
      PrivateAttribute;
    blocked: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    preferedLanguage: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"admin::user", "oneToOne", "admin::user"> &
      PrivateAttribute;
    updatedBy: RelationAttribute<"admin::user", "oneToOne", "admin::user"> &
      PrivateAttribute;
  };
}

export interface AdminRole extends CollectionTypeSchema {
  info: {
    name: "Role";
    description: "";
    singularName: "role";
    pluralName: "roles";
    displayName: "Role";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    code: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute;
    users: RelationAttribute<"admin::role", "manyToMany", "admin::user">;
    permissions: RelationAttribute<
      "admin::role",
      "oneToMany",
      "admin::permission"
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"admin::role", "oneToOne", "admin::user"> &
      PrivateAttribute;
    updatedBy: RelationAttribute<"admin::role", "oneToOne", "admin::user"> &
      PrivateAttribute;
  };
}

export interface AdminApiToken extends CollectionTypeSchema {
  info: {
    name: "Api Token";
    singularName: "api-token";
    pluralName: "api-tokens";
    displayName: "Api Token";
    description: "";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }> &
      DefaultTo<"">;
    type: EnumerationAttribute<["read-only", "full-access"]> &
      DefaultTo<"read-only">;
    accessKey: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "admin::api-token",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "admin::api-token",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFile extends CollectionTypeSchema {
  info: {
    singularName: "file";
    pluralName: "files";
    displayName: "File";
    description: "";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute & RequiredAttribute;
    alternativeText: StringAttribute;
    caption: StringAttribute;
    width: IntegerAttribute;
    height: IntegerAttribute;
    formats: JSONAttribute;
    hash: StringAttribute & RequiredAttribute;
    ext: StringAttribute;
    mime: StringAttribute & RequiredAttribute;
    size: DecimalAttribute & RequiredAttribute;
    url: StringAttribute & RequiredAttribute;
    previewUrl: StringAttribute;
    provider: StringAttribute & RequiredAttribute;
    provider_metadata: JSONAttribute;
    related: RelationAttribute<"plugin::upload.file", "morphToMany">;
    folder: RelationAttribute<
      "plugin::upload.file",
      "manyToOne",
      "plugin::upload.folder"
    > &
      PrivateAttribute;
    folderPath: StringAttribute &
      RequiredAttribute &
      PrivateAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "plugin::upload.file",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "plugin::upload.file",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFolder extends CollectionTypeSchema {
  info: {
    singularName: "folder";
    pluralName: "folders";
    displayName: "Folder";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    pathId: IntegerAttribute & RequiredAttribute & UniqueAttribute;
    parent: RelationAttribute<
      "plugin::upload.folder",
      "manyToOne",
      "plugin::upload.folder"
    >;
    children: RelationAttribute<
      "plugin::upload.folder",
      "oneToMany",
      "plugin::upload.folder"
    >;
    files: RelationAttribute<
      "plugin::upload.folder",
      "oneToMany",
      "plugin::upload.file"
    >;
    path: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "plugin::upload.folder",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "plugin::upload.folder",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface PluginI18NLocale extends CollectionTypeSchema {
  info: {
    singularName: "locale";
    pluralName: "locales";
    collectionName: "locales";
    displayName: "Locale";
    description: "";
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: StringAttribute & UniqueAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "plugin::i18n.locale",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "plugin::i18n.locale",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsPermission extends CollectionTypeSchema {
  info: {
    name: "permission";
    description: "";
    singularName: "permission";
    pluralName: "permissions";
    displayName: "Permission";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute & RequiredAttribute;
    role: RelationAttribute<
      "plugin::users-permissions.permission",
      "manyToOne",
      "plugin::users-permissions.role"
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "plugin::users-permissions.permission",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "plugin::users-permissions.permission",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsRole extends CollectionTypeSchema {
  info: {
    name: "role";
    description: "";
    singularName: "role";
    pluralName: "roles";
    displayName: "Role";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    description: StringAttribute;
    type: StringAttribute & UniqueAttribute;
    permissions: RelationAttribute<
      "plugin::users-permissions.role",
      "oneToMany",
      "plugin::users-permissions.permission"
    >;
    users: RelationAttribute<
      "plugin::users-permissions.role",
      "oneToMany",
      "plugin::users-permissions.user"
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "plugin::users-permissions.role",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "plugin::users-permissions.role",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsUser extends CollectionTypeSchema {
  info: {
    name: "user";
    description: "";
    singularName: "user";
    pluralName: "users";
    displayName: "User";
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    email: EmailAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: StringAttribute;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    confirmationToken: StringAttribute & PrivateAttribute;
    confirmed: BooleanAttribute & DefaultTo<false>;
    blocked: BooleanAttribute & DefaultTo<false>;
    role: RelationAttribute<
      "plugin::users-permissions.user",
      "manyToOne",
      "plugin::users-permissions.role"
    >;
    articles: RelationAttribute<
      "plugin::users-permissions.user",
      "oneToMany",
      "api::article.article"
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "plugin::users-permissions.user",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "plugin::users-permissions.user",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiArticleArticle extends CollectionTypeSchema {
  info: {
    singularName: "article";
    pluralName: "articles";
    displayName: "Article";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: StringAttribute & RequiredAttribute & UniqueAttribute;
    excerpt: TextAttribute;
    content: RichTextAttribute & RequiredAttribute;
    author: RelationAttribute<
      "api::article.article",
      "manyToOne",
      "api::author.author"
    >;
    image: MediaAttribute & RequiredAttribute;
    slug: UIDAttribute & RequiredAttribute;
    content2: DynamicZoneAttribute<["article.body", "article.image"]>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::article.article",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::article.article",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiAuthorAuthor extends CollectionTypeSchema {
  info: {
    singularName: "author";
    pluralName: "authors";
    displayName: "Article author";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Name: StringAttribute & RequiredAttribute;
    Email: StringAttribute & RequiredAttribute & UniqueAttribute;
    articles: RelationAttribute<
      "api::author.author",
      "oneToMany",
      "api::article.article"
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::author.author",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::author.author",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiCategoryCategory extends CollectionTypeSchema {
  info: {
    singularName: "category";
    pluralName: "categories";
    displayName: "Restaurant category";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: StringAttribute & RequiredAttribute & UniqueAttribute;
    restaurants: RelationAttribute<
      "api::category.category",
      "manyToMany",
      "api::restaurant.restaurant"
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::category.category",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::category.category",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiGlobalConfigGlobalConfig extends SingleTypeSchema {
  info: {
    singularName: "global-config";
    pluralName: "global-configs";
    displayName: "Global Config";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    SiteName: StringAttribute & RequiredAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::global-config.global-config",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::global-config.global-config",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiPagePage extends CollectionTypeSchema {
  info: {
    singularName: "page";
    pluralName: "pages";
    displayName: "Page";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Content: DynamicZoneAttribute<["shared.page-hero"]>;
    title: StringAttribute;
    slug: UIDAttribute<"api::page.page", "title">;
    SEO: ComponentAttribute<"shared.seo">;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"api::page.page", "oneToOne", "admin::user"> &
      PrivateAttribute;
    updatedBy: RelationAttribute<"api::page.page", "oneToOne", "admin::user"> &
      PrivateAttribute;
  };
}

export interface ApiRestaurantRestaurant extends CollectionTypeSchema {
  info: {
    singularName: "restaurant";
    pluralName: "restaurants";
    displayName: "Restaurant";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: StringAttribute & RequiredAttribute & UniqueAttribute;
    description: RichTextAttribute;
    categories: RelationAttribute<
      "api::restaurant.restaurant",
      "manyToMany",
      "api::category.category"
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::restaurant.restaurant",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::restaurant.restaurant",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ArticleBody extends ComponentSchema {
  info: {
    displayName: "Body";
    icon: "align-justify";
  };
  attributes: {
    Content: RichTextAttribute;
  };
}

export interface ArticleImage extends ComponentSchema {
  info: {
    displayName: "Image";
    icon: "image";
  };
  attributes: {
    Image: MediaAttribute;
    Alt: StringAttribute;
    Caption: StringAttribute;
  };
}

export interface SharedPageHero extends ComponentSchema {
  info: {
    displayName: "Page hero";
    icon: "umbrella-beach";
  };
  attributes: {
    Title: StringAttribute & RequiredAttribute;
    Description: TextAttribute;
  };
}

export interface SharedSeo extends ComponentSchema {
  info: {
    displayName: "SEO";
    icon: "building";
  };
  attributes: {
    metaTitle: StringAttribute & RequiredAttribute;
    metaDescription: TextAttribute & RequiredAttribute;
    shareImage: MediaAttribute;
  };
}

declare global {
  namespace Strapi {
    interface Schemas {
      "admin::permission": AdminPermission;
      "admin::user": AdminUser;
      "admin::role": AdminRole;
      "admin::api-token": AdminApiToken;
      "plugin::upload.file": PluginUploadFile;
      "plugin::upload.folder": PluginUploadFolder;
      "plugin::i18n.locale": PluginI18NLocale;
      "plugin::users-permissions.permission": PluginUsersPermissionsPermission;
      "plugin::users-permissions.role": PluginUsersPermissionsRole;
      "plugin::users-permissions.user": PluginUsersPermissionsUser;
      "api::article.article": ApiArticleArticle;
      "api::author.author": ApiAuthorAuthor;
      "api::category.category": ApiCategoryCategory;
      "api::global-config.global-config": ApiGlobalConfigGlobalConfig;
      "api::page.page": ApiPagePage;
      "api::restaurant.restaurant": ApiRestaurantRestaurant;
      "article.body": ArticleBody;
      "article.image": ArticleImage;
      "shared.page-hero": SharedPageHero;
      "shared.seo": SharedSeo;
    }
  }
}
