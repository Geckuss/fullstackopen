import { test, describe } from 'node:test'
import { strictEqual } from 'node:assert'
import { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } from '../utils/list_helper.js'

describe('dummy test', () => {
    test('dummy returns one', () => {
        const blogs = []

        const result = dummy(blogs)
        strictEqual(result, 1)
    })
})

describe('totalLikes tests', () => {
    test('totalLikes returns the total likes of all blogs', () => {
        const blogs = [
            { title: 'Blog 1', likes: 5 },
            { title: 'Blog 2', likes: 10 },
            { title: 'Blog 3', likes: 15 },
        ]

        const result = totalLikes(blogs)
        strictEqual(result, 30)
    })
})

describe('favoriteBlog tests', () => {
    test('favoriteBlog returns the blog with the most likes', () => {
        const blogs = [
            { title: 'Blog 1', likes: 5 },
            { title: 'Blog 2', likes: 10 },
            { title: 'Blog 3', likes: 15 },
        ]

        const result = favoriteBlog(blogs)
        strictEqual(result, blogs[2])
    })
})

describe('mostBlogs tests', () => {
    test('mostBlogs returns the author with the most blogs and the number of blogs', () => {
        const blogs = [
            { title: 'Blog 1', author: 'Author 1', likes: 5 },
            { title: 'Blog 2', author: 'Author 1', likes: 10 },
            { title: 'Blog 3', author: 'Author 2', likes: 15 },
            { title: 'Blog 4', author: 'Author 2', likes: 20 },
            { title: 'Blog 5', author: 'Author 2', likes: 25 },
        ]

        const result = mostBlogs(blogs)
        strictEqual(result.author, 'Author 2')
        strictEqual(result.blogs, 3)
    })
})

describe('mostLikes tests', () => {
    test('mostLikes returns the author with the most likes and the total number of likes', () => {
        const blogs = [
            { title: 'Blog 1', author: 'Author 1', likes: 5 },
            { title: 'Blog 2', author: 'Author 1', likes: 10 },
            { title: 'Blog 3', author: 'Author 2', likes: 15 },
            { title: 'Blog 4', author: 'Author 2', likes: 20 },
            { title: 'Blog 5', author: 'Author 2', likes: 25 },
        ]

        const result = mostLikes(blogs)
        strictEqual(result.author, 'Author 2')
        strictEqual(result.likes, 60)
    })
})