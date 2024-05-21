const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
}

const favoriteBlog = (blogs) => {
    if (!blogs.length) return null;

    return blogs.reduce((prev, current) => {
        return (prev.likes > current.likes) ? prev : current;
    });
}

export { dummy, totalLikes, favoriteBlog };