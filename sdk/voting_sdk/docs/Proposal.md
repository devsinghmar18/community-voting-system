# Proposal


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **int** |  | 
**title** | **str** |  | 
**description** | **str** |  | 
**created_at** | **datetime** |  | 
**deadline** | **datetime** |  | 
**status** | **str** |  | 

## Example

```python
from openapi_client.models.proposal import Proposal

# TODO update the JSON string below
json = "{}"
# create an instance of Proposal from a JSON string
proposal_instance = Proposal.from_json(json)
# print the JSON string representation of the object
print(Proposal.to_json())

# convert the object into a dict
proposal_dict = proposal_instance.to_dict()
# create an instance of Proposal from a dict
proposal_from_dict = Proposal.from_dict(proposal_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


