# Vote


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **int** |  | 
**proposal_id** | **int** |  | 
**voter_name** | **str** |  | 
**vote** | **str** |  | 
**voted_at** | **datetime** |  | 

## Example

```python
from openapi_client.models.vote import Vote

# TODO update the JSON string below
json = "{}"
# create an instance of Vote from a JSON string
vote_instance = Vote.from_json(json)
# print the JSON string representation of the object
print(Vote.to_json())

# convert the object into a dict
vote_dict = vote_instance.to_dict()
# create an instance of Vote from a dict
vote_from_dict = Vote.from_dict(vote_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


