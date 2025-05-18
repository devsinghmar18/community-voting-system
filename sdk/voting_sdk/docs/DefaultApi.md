# openapi_client.DefaultApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**close_proposal_proposals_proposal_id_close_patch**](DefaultApi.md#close_proposal_proposals_proposal_id_close_patch) | **PATCH** /proposals/{proposal_id}/close | Close Proposal
[**create_proposal_proposals_post**](DefaultApi.md#create_proposal_proposals_post) | **POST** /proposals/ | Create Proposal
[**create_vote_proposals_proposal_id_vote_post**](DefaultApi.md#create_vote_proposals_proposal_id_vote_post) | **POST** /proposals/{proposal_id}/vote | Create Vote
[**delete_proposal_proposals_proposal_id_delete**](DefaultApi.md#delete_proposal_proposals_proposal_id_delete) | **DELETE** /proposals/{proposal_id} | Delete Proposal
[**delete_vote_votes_vote_id_delete**](DefaultApi.md#delete_vote_votes_vote_id_delete) | **DELETE** /votes/{vote_id} | Delete Vote
[**get_votes_proposals_proposal_id_votes_get**](DefaultApi.md#get_votes_proposals_proposal_id_votes_get) | **GET** /proposals/{proposal_id}/votes | Get Votes
[**read_proposal_proposals_proposal_id_get**](DefaultApi.md#read_proposal_proposals_proposal_id_get) | **GET** /proposals/{proposal_id} | Read Proposal
[**read_proposals_proposals_get**](DefaultApi.md#read_proposals_proposals_get) | **GET** /proposals/ | Read Proposals


# **close_proposal_proposals_proposal_id_close_patch**
> Proposal close_proposal_proposals_proposal_id_close_patch(proposal_id)

Close Proposal

### Example


```python
import openapi_client
from openapi_client.models.proposal import Proposal
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.DefaultApi(api_client)
    proposal_id = 56 # int | 

    try:
        # Close Proposal
        api_response = api_instance.close_proposal_proposals_proposal_id_close_patch(proposal_id)
        print("The response of DefaultApi->close_proposal_proposals_proposal_id_close_patch:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->close_proposal_proposals_proposal_id_close_patch: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **proposal_id** | **int**|  | 

### Return type

[**Proposal**](Proposal.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **create_proposal_proposals_post**
> Proposal create_proposal_proposals_post(proposal_create)

Create Proposal

### Example


```python
import openapi_client
from openapi_client.models.proposal import Proposal
from openapi_client.models.proposal_create import ProposalCreate
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.DefaultApi(api_client)
    proposal_create = openapi_client.ProposalCreate() # ProposalCreate | 

    try:
        # Create Proposal
        api_response = api_instance.create_proposal_proposals_post(proposal_create)
        print("The response of DefaultApi->create_proposal_proposals_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->create_proposal_proposals_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **proposal_create** | [**ProposalCreate**](ProposalCreate.md)|  | 

### Return type

[**Proposal**](Proposal.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **create_vote_proposals_proposal_id_vote_post**
> Vote create_vote_proposals_proposal_id_vote_post(proposal_id, vote_create)

Create Vote

### Example


```python
import openapi_client
from openapi_client.models.vote import Vote
from openapi_client.models.vote_create import VoteCreate
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.DefaultApi(api_client)
    proposal_id = 56 # int | 
    vote_create = openapi_client.VoteCreate() # VoteCreate | 

    try:
        # Create Vote
        api_response = api_instance.create_vote_proposals_proposal_id_vote_post(proposal_id, vote_create)
        print("The response of DefaultApi->create_vote_proposals_proposal_id_vote_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->create_vote_proposals_proposal_id_vote_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **proposal_id** | **int**|  | 
 **vote_create** | [**VoteCreate**](VoteCreate.md)|  | 

### Return type

[**Vote**](Vote.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **delete_proposal_proposals_proposal_id_delete**
> Proposal delete_proposal_proposals_proposal_id_delete(proposal_id)

Delete Proposal

### Example


```python
import openapi_client
from openapi_client.models.proposal import Proposal
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.DefaultApi(api_client)
    proposal_id = 56 # int | 

    try:
        # Delete Proposal
        api_response = api_instance.delete_proposal_proposals_proposal_id_delete(proposal_id)
        print("The response of DefaultApi->delete_proposal_proposals_proposal_id_delete:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->delete_proposal_proposals_proposal_id_delete: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **proposal_id** | **int**|  | 

### Return type

[**Proposal**](Proposal.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **delete_vote_votes_vote_id_delete**
> Vote delete_vote_votes_vote_id_delete(vote_id)

Delete Vote

### Example


```python
import openapi_client
from openapi_client.models.vote import Vote
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.DefaultApi(api_client)
    vote_id = 56 # int | 

    try:
        # Delete Vote
        api_response = api_instance.delete_vote_votes_vote_id_delete(vote_id)
        print("The response of DefaultApi->delete_vote_votes_vote_id_delete:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->delete_vote_votes_vote_id_delete: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **vote_id** | **int**|  | 

### Return type

[**Vote**](Vote.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_votes_proposals_proposal_id_votes_get**
> List[Vote] get_votes_proposals_proposal_id_votes_get(proposal_id)

Get Votes

### Example


```python
import openapi_client
from openapi_client.models.vote import Vote
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.DefaultApi(api_client)
    proposal_id = 56 # int | 

    try:
        # Get Votes
        api_response = api_instance.get_votes_proposals_proposal_id_votes_get(proposal_id)
        print("The response of DefaultApi->get_votes_proposals_proposal_id_votes_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->get_votes_proposals_proposal_id_votes_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **proposal_id** | **int**|  | 

### Return type

[**List[Vote]**](Vote.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **read_proposal_proposals_proposal_id_get**
> Proposal read_proposal_proposals_proposal_id_get(proposal_id)

Read Proposal

### Example


```python
import openapi_client
from openapi_client.models.proposal import Proposal
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.DefaultApi(api_client)
    proposal_id = 56 # int | 

    try:
        # Read Proposal
        api_response = api_instance.read_proposal_proposals_proposal_id_get(proposal_id)
        print("The response of DefaultApi->read_proposal_proposals_proposal_id_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->read_proposal_proposals_proposal_id_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **proposal_id** | **int**|  | 

### Return type

[**Proposal**](Proposal.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **read_proposals_proposals_get**
> List[Proposal] read_proposals_proposals_get()

Read Proposals

### Example


```python
import openapi_client
from openapi_client.models.proposal import Proposal
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.DefaultApi(api_client)

    try:
        # Read Proposals
        api_response = api_instance.read_proposals_proposals_get()
        print("The response of DefaultApi->read_proposals_proposals_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->read_proposals_proposals_get: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

[**List[Proposal]**](Proposal.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

