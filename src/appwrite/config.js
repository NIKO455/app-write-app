import {Client, ID, Databases, Storage, Query} from "appwrite";
import conf from "../conf/conf.js"

class Config {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    /*
    * Create an Appwrite post
    *
    * @param {String} title - The title of the post
    * @param {String} slug - The slug for the post
    * @param {String} content - The content of the post
    * @param {String} featuredImage - The URL of the featured image for the post
    * @param {String} status - The status of the post
    * @param {String} userId - The ID of the user creating the post
    * @returns {Object} - Returns the created document object if successful, otherwise throws an error
    */
    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
        } catch (err) {
            console.error('Error creating post:', err);
            throw err;
        }
    }

    /*
     * Update an Appwrite post
     *
     * @param {String} slug - The slug for the post
     * @param {String} title - The title of the post
     * @param {String} content - The content of the post
     * @param {String} featuredImage - The URL of the featured image for the post
     * @param {String} status - The status of the post
     * @returns {Object} - Returns the update document object if successful, otherwise throws an error
     */
    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (err) {
            console.error('Error creating post:', err);
            throw err;
        }
    }

    /*
     * Delete an Appwrite post
     *
     * @param {String} slug - The slug of the post to delete
     * @returns {Boolean} - Returns true if the post was successfully deleted, otherwise returns false
     */
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (err) {
            console.error('Error deleting post:', err);
            return false;
        }
    }

    /*
    * Get Specific Appwrite post
    *
    * @param {String} slug - The slug of the post to get
    * @returns {Object} - Returns document if the post is present and fetched successfully, otherwise returns false
    */
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (err) {
            console.error('Error deleting post:', err);
            return false
        }
    }

    /*
    * Get All Appwrite post
    *
    * @param {queries} queries - The queries for getting the posts
    * @returns {Object} - Returns list of documents , otherwise returns false
    */
    async getPosts(queries = [Query.equal('status', 'active')]) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (err) {
            console.error('Error deleting post:', err);
            return false
        }
    }

    /*
    * Upload a file to Appwrite storage
    *
    * @param {File} file - The file to be uploaded
    * @returns {Boolean} - Returns true if the file was successfully uploaded, otherwise returns false
    */
    async uploadFile(file) {
        try {
            await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
            return true;
        } catch (err) {
            console.error('Error uploading file:', err);
            return false;
        }
    }

    /*
    * Delete a file to Appwrite storage
    *
    * @param {fileId} fileId - The file id to be deleted
    * @returns {Boolean} - Returns true if the file was successfully deleted, otherwise returns false
    */
    async deleteFile(fileId) {
        try {
            await this.storage.createFile(
                conf.appwriteBucketId,
                fileId,
            );
            return true;
        } catch (err) {
            console.error('Error deleting file:', err);
            return false;
        }
    }

    /*
    * Get a preview URL for a file in Appwrite storage
    *
    * @param {String} fileId - The ID of the file to get the preview for
    * @returns {String} - Returns the URL for the file preview
    */
    getFilePreview(fileId) {
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
    }

}

const configService = new Config();

export default configService;
