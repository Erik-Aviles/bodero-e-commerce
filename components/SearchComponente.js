import React, { useState } from "react";
import { createAutocomplete } from "@algolia/autocomplete-core";

const SearchComponente = (props) => {
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false,
  });
  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        onStateChange: ({ state }) => setAutocompleteState(state),
        getSources: () => [
          {
            sourceId: "products-api",
            getItems: ({ query }) => {
              if (!!query) {
                return fetch(`/api/search?q=${query}`).then((res) =>
                  res.json()
                );
              }
            },
          },
        ],
        ...props,
      }),
    [props]
  );

  return <div>SearchComponente</div>;
};

export default SearchComponente;
