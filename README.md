stucco-data
===========

Enumeration of data sources that can be used to provide context to security events

Data sources are enumerated as JSON array. The format is:
    {
      "name": "required name of the data source"
    , "url": "optional URL to download data from"
    , "type": "optional type [web, Atom, RSS, API]"
    , "info": "optional URL to find out more information"
    , "description": "optional description about the data source"
    , "categories": ["optional array of categories for the data source"]
    }