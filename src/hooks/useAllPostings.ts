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
        .filter(({ categories }) => categories?.nodes?.length > 0)
        .map(({ categories, ...posting }) => {
          // It trickly uses Wordpress's category taxony to figure out the field values for
          // each posting. It's ok since we do want WP to be our source of truth.
          const pair = categories.nodes
            .filter(
              ({ ancestors: { nodes } }) =>
                nodes?.length > 0 &&
                (nodes[0]?.name.includes("Department") ||
                  nodes[1]?.name.includes("Department"))
            )
            .map(({ ancestors: { nodes }, name }) => [nodes[1]?.name, name])[0]

          return { ...posting, categories, pair }
        })
        .filter(({ pair }) => pair?.length)
        .map(({ title, slug, categories }) => {
          const findFieldByTerm = (term: string) =>
            categories.nodes.find(({ ancestors: { nodes } }) =>
              nodes[0]?.name?.includes(term)
            )?.name;
          const department = categories?.nodes?.find((loc) => (
            loc?.ancestors?.nodes?.length === 1 &&
            loc?.ancestors?.nodes[0]?.name === 'Departments'
          ));
          const seniority = findFieldByTerm('Seniorities');
          const continent = categories?.nodes?.find((loc) => (
            loc?.ancestors?.nodes?.length === 1 &&
            loc?.ancestors?.nodes[0]?.name === 'Locations'
          ));
          let country = null;
          let city = null;
          let team = null;

          if (department?.name?.length) {
            team = categories?.nodes?.find((dep: any) => (
              dep?.ancestors?.nodes?.length === 2 &&
              dep?.ancestors?.nodes?.some((jDep: any) => jDep?.name === department?.name)
            ));
          }

          if (continent?.name?.length) {
            country = categories?.nodes?.find((loc: any) => (
              loc?.ancestors?.nodes?.length === 2 &&
              loc?.ancestors?.nodes?.some((jLoc: any) => jLoc?.name === continent?.name)
            ));
          }

          if (country?.name?.length) {
            city = categories?.nodes?.find((loc: any) => loc?.ancestors?.nodes?.length === 3 &&
              loc?.ancestors?.nodes?.some((jLoc: any) => jLoc?.name === country?.name));
          }

          return {
            title,
            slug,
            department: department?.name || null,
            team: team?.name || null,
            seniority,
            continent: continent?.name || null,
            country: country?.name || null,
            city: city?.name || null,
          } as Posting
        })
    )
  }, [data])
  return postings
}
