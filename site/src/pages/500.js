import Error from "next/error";

/**
 * Returns an error.
 * @returns a status code of 500
 */
export default function Custom500() {
  return <Error statusCode={500} />;
}
