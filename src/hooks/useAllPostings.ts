import { useStaticQuery, graphql } from "gatsby"
import { useMemo } from "react"
import type { Posting } from "../typings"
export const useAllPostings = () => {
  const data = useStaticQuery(graphql`
    {
      allWpPosting {
        nodes {
          id
          slug
          title
          categories {
            nodes {
              ancestors {
                nodes {
                  name
                }
              }
              slug
              name
            }
          }
        }
      }
    }
  `)
  const postings = useMemo(() => {
    const allPostings = data?.allWpPosting?.nodes
    if (!allPostings) {
      return []
    }
    return (
      allPostings
        // For some reason, some posts come with no categories.
        .filter(({ categories }) => categories?.nodes?.length > 1)
        .map(({ categories, ...posting }) => {
          // It trickly uses Wordpress's category taxony to figure out the field values for
          // each posting. It's ok since we do want WP to be our source of truth.
          const pair = categories.nodes
            .filter(
              ({ ancestors: { nodes } }) =>
                nodes.length > 1 &&
                (nodes[0]?.name.includes("Department") ||
                  nodes[1]?.name.includes("Department"))
            )
            .map(({ ancestors: { nodes }, name }) => [nodes[1]?.name, name])[0]

          return { ...posting, categories, pair }
        })
        .filter(({ pair }) => pair?.length)
        .map(({ title, slug, pair, categories }) => {
          const [department, team] = pair
          const findFieldByTerm = (term: string) =>
            categories.nodes.find(({ ancestors: { nodes } }) =>
              nodes[0]?.name?.includes(term)
            )?.name
          const seniority = findFieldByTerm("Seniority")
          const location = findFieldByTerm("Location")
          return {
            title,
            slug,
            department,
            team,
            seniority,
            location,
          } as Posting
        })
    )
  }, [data])
  return postings
}
