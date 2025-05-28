package com.example.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * ResponseWiadomosciGetconversationsConversations
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-04-01T20:32:28.347647700+02:00[Europe/Warsaw]")


public class ResponseWiadomosciGetconversationsConversations   {
  @JsonProperty("avatar_url")
  private String avatarUrl = null;

  @JsonProperty("user_id")
  private Integer userId = null;

  @JsonProperty("id_transaction")
  private Integer idTransaction = null;

  public ResponseWiadomosciGetconversationsConversations avatarUrl(String avatarUrl) {
    this.avatarUrl = avatarUrl;
    return this;
  }

  /**
   * Get avatarUrl
   * @return avatarUrl
   **/
  @Schema(example = "https://example.com/avatars/user123.png", description = "")
  
    public String getAvatarUrl() {
    return avatarUrl;
  }

  public void setAvatarUrl(String avatarUrl) {
    this.avatarUrl = avatarUrl;
  }

  public ResponseWiadomosciGetconversationsConversations userId(Integer userId) {
    this.userId = userId;
    return this;
  }

  /**
   * Get userId
   * @return userId
   **/
  @Schema(example = "123", description = "")
  
    public Integer getUserId() {
    return userId;
  }

  public void setUserId(Integer userId) {
    this.userId = userId;
  }

  public ResponseWiadomosciGetconversationsConversations idTransaction(Integer idTransaction) {
    this.idTransaction = idTransaction;
    return this;
  }

  /**
   * Get idTransaction
   * @return idTransaction
   **/
  @Schema(example = "456", description = "")
  
    public Integer getIdTransaction() {
    return idTransaction;
  }

  public void setIdTransaction(Integer idTransaction) {
    this.idTransaction = idTransaction;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ResponseWiadomosciGetconversationsConversations responseWiadomosciGetconversationsConversations = (ResponseWiadomosciGetconversationsConversations) o;
    return Objects.equals(this.avatarUrl, responseWiadomosciGetconversationsConversations.avatarUrl) &&
        Objects.equals(this.userId, responseWiadomosciGetconversationsConversations.userId) &&
        Objects.equals(this.idTransaction, responseWiadomosciGetconversationsConversations.idTransaction);
  }

  @Override
  public int hashCode() {
    return Objects.hash(avatarUrl, userId, idTransaction);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ResponseWiadomosciGetconversationsConversations {\n");
    
    sb.append("    avatarUrl: ").append(toIndentedString(avatarUrl)).append("\n");
    sb.append("    userId: ").append(toIndentedString(userId)).append("\n");
    sb.append("    idTransaction: ").append(toIndentedString(idTransaction)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
