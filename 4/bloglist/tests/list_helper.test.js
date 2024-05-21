import { test, describe } from 'node:test'
import { strictEqual } from 'node:assert'
import { dummy, totalLikes, favoriteBlog } from '../utils/list_helper.js'

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