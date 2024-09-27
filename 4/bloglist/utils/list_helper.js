const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
    if (!blogs.length) return null;

    return blogs.reduce((prev, current) => {
        return prev.likes > current.likes ? prev : current;
    });
};

const mostBlogs = (blogs) => {
    if (!blogs.length) return null;

    const authors = blogs.reduce((acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + 1;
        return acc;
    }, {});

    const authorWithMostBlogs = Object.entries(authors).reduce((a, b) =>
        a[1] > b[1] ? a : b
    );

    return {
        author: authorWithMostBlogs[0],
        blogs: authorWithMostBlogs[1],
    };
};

const mostLikes = (blogs) => {
    if (!blogs.length) return null;

    const authors = blogs.reduce((acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
        return acc;
    }, {});

    const authorWithMostLikes = Object.entries(authors).reduce((a, b) =>
        a[1] > b[1] ? a : b
    );

    return {
        author: authorWithMostLikes[0],
        likes: authorWithMostLikes[1],
    };
};

export { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
